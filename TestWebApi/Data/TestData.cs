using TestWebApi.Models;

namespace TestWebApi.Data
{
    public class TestData
    {
        public static List<Test> Tests = new List<Test>
    {
        new Test
        {
            TestId = 1,
            TestTitle = "Test 1",
            TestDescription = @"It is a long established fact that a reader will be distracted by the readable content of
                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                                normal distribution of letters, as opposed to using 'Content here, content here', making it look 
                                like readable English.",
            Questions = new List<Question>
            {
                new Question
                {
                    QuestionId = 1,
                    Text = "Question 1",
                    Answers = new List<Answer>
                    {
                        new Answer { AnswerId = 1, Text = "Answer 1", IsCorrect = false },
                        new Answer { AnswerId = 2, Text = "Correct", IsCorrect = true },
                        new Answer { AnswerId = 3, Text = "Answer 3", IsCorrect = false }
                    }
                },
                new Question
                {
                    QuestionId = 2,
                    Text = "Question 2",
                    Answers = new List<Answer>
                    {
                        new Answer { AnswerId = 4, Text = "Correct", IsCorrect = true },
                        new Answer { AnswerId = 5, Text = "Answer 5", IsCorrect = false },
                        new Answer { AnswerId = 6, Text = "Answer 6", IsCorrect = false }
                    }
                }
            }
        },
        new Test
        {
            TestId = 2,
            TestTitle = "Test 2",
            TestDescription = @"It is a long established fact that a reader will be distracted by the readable content of
                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                                normal distribution of letters, as opposed to using 'Content here, content here', making it look 
                                like readable English.",
            Questions = new List<Question>
            {
                new Question
                {
                    QuestionId = 1,
                    Text = "Question 1",
                    Answers = new List<Answer>
                    {
                        new Answer { AnswerId = 1, Text = "Answer 1", IsCorrect = false },
                        new Answer { AnswerId = 2, Text = "Answer 2", IsCorrect = true },
                        new Answer { AnswerId = 3, Text = "Answer 3", IsCorrect = false }
                    }
                },
                new Question
                {
                    QuestionId = 2,
                    Text = "Question 2",
                    Answers = new List<Answer>
                    {
                        new Answer { AnswerId = 4, Text = "Answer 4", IsCorrect = true },
                        new Answer { AnswerId = 5, Text = "Answer 5", IsCorrect = false },
                        new Answer { AnswerId = 6, Text = "Answer 6", IsCorrect = false }
                    }
                }
            }
        }
    };
    }
}
