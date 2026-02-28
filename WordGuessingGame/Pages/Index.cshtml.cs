using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics;
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

        private static string AnswerCheck(string word)
        {
            string verdict = "";
            for (int i = 0; i < CorrectWord.Length; i++)
            {
                if (CorrectWord[i] == word[i])
                {
                    verdict += "T";
                }
                else if (ContainsCharacter(word[i]))
                {
                    verdict += "C";
                }

                else
                {
                    verdict += "F";
                }

            }

            return verdict;
        }

        private static bool ContainsCharacter(char character)
        {
            return CorrectWord.Contains(character);
        }
    }




    public record Validated_Word(string word);
}
