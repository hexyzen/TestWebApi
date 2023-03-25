namespace TestWebApi.Models
{
    public class Test
    {
        public int TestId { get; set; }
        public string TestTitle { get; set; }
        public string TestDescription { get; set; }
        public List<Question> Questions { get; set; }
    }
}
