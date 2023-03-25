using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TestWebApi.Data;
using TestWebApi.Models;

namespace TestWebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration) { _configuration = configuration; }

        protected async Task<string> CreateUserJWTAcessToken(string userName, int userId)
        {
            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserName", userName),
                    new Claim("UserId", userId.ToString()),
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                 _configuration["Jwt:Issuer"],
                 _configuration["Jwt:Audience"],
               claims,
                  expires: DateTime.UtcNow.AddDays(1),
                  signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLogin)
        {
            var user = UserData.Users.FirstOrDefault(u => u.UserName == userLogin.UserName && u.Password == userLogin.Password);

            if (user == null)
            {
                // If the user is not found, return a 401 Unauthorized response
                return Unauthorized();
            }
            else
            {
                // If the user is found, generate an authentication token and return it in the response
                var token = await CreateUserJWTAcessToken(userLogin.UserName, user.UserId);
                return Ok(token);
            }
        }

    }
}
