using TestWebApi.Models;

namespace TestWebApi.Data
{
    public class UserData
    {
        public static List<User> Users { get; set; } = new List<User>()
    {
        new User() { UserId = 1, UserName = "John", Password = "password", SelectedTestIds = new List<int> { 1, 2 } },
        new User() { UserId = 2, UserName = "Shepherd", Password = "password2", SelectedTestIds = new List<int> {1} }
    };

    }
}
