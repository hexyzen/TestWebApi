using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;
using TestWebApi.Data;
using TestWebApi.Models;

namespace TestWebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {



        [Authorize]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Test>>> GetTests()
        {
            // Get the authenticated user's selected test ids from the dataset
            var currentUser = GetCurrentUser();

            List<int> selectedTestIds = UserData.Users
                                    .First(u => u.UserId == currentUser.UserId)
                                    .SelectedTestIds;
            List<Test> selectedTests = TestData.Tests
                                        .Where(t => selectedTestIds.Contains(t.TestId))
                                        .Select(t => new Test { TestId = t.TestId, TestTitle = t.TestTitle, TestDescription = t.TestDescription })
                                        .ToList();

            return selectedTests;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Test>> GetTestById(int testId)
        {
            var currentUser = GetCurrentUser();
            // Find the user in the dataset by their ID
            User user = UserData.Users.FirstOrDefault(u => u.UserId == currentUser.UserId);

            // If the user is null, return 401 Unauthorized
            if (user == null)
            {
                return Unauthorized();
            }

            // Check if the test ID is in the user's selected test IDs
            if (!user.SelectedTestIds.Contains(testId))
            {
                return BadRequest("This test is not available for this user.");
            }

            // Find the test in the dataset by its ID
            Test test = TestData.Tests.FirstOrDefault(t => t.TestId == testId);

            // If the test is null, return 404 Not Found
            if (test == null)
            {
                return NotFound();
            }

            if (test == null)
            {
                return NotFound();
            }

            return test;
        }

        private UserLoginDto GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new UserLoginDto
                {
                    UserName = userClaims.FirstOrDefault(o => o.Type == "UserName")?.Value,
                    UserId = Convert.ToInt32(userClaims.FirstOrDefault(o => o.Type == "UserId")?.Value),
                };
            }
            return null;
        }
    }
}
