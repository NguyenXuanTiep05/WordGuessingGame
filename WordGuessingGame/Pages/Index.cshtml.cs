using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics.Metrics;
using System.Transactions;

namespace WordGuessingGame.Pages
{
    [IgnoreAntiforgeryToken]
    public class IndexModel : PageModel
    {
        private const string CorrectWord = "HELLO";

        public ContentResult OnPostValidate([FromBody] Validated_Word data)
        {
            var guess = string.Concat(data.word).ToUpperInvariant();
            return Content(AnswerCheck(guess));
        }

        private string AnswerCheck(string word)
        {
            string verdict = "";
            for (int i = 0; i < CorrectWord.Length; i++)
            {
                string temp = "";

                temp += word[i] == CorrectWord[i] ? "T" : "F";

                verdict += temp;
            }

            return verdict;
        }
    }

    public record Validated_Word(string word);
}
