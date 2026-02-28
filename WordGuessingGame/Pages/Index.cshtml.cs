using Microsoft.AspNetCore.DataProtection.KeyManagement;
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
        private static string[] guessWord = {
            "apple","grape","peach","mango","lemon","berry","melon","olive","bread","sugar",
            "honey","candy","chair","table","couch","shelf","plant","stone","brick","metal",
            "water","river","ocean","beach","cloud","storm","flame","smoke","light","sound",
            "voice","heart","brain","dream","field","grass","forest","trail","valley","plain",
            "horse","sheep","tiger","zebra","eagle","shark","whale","snake","mouse","panda",
            "spoon","plate","knife","glass","clock","brush","shirt","pants","shoes","socks",
            "house","store","tower","hotel","school","church","court","crown","sword","shield",
            "piano","viola","drums","flute","radio","phone","cable","truck","train","plane",
            "motor","wheel","engine","frame","panel","brick","stone","steel","fiber","paper",
            "novel","story","poem","image","photo","video","music","album","actor","queen",
            "king","pride","truth","peace","power","money","skill","trade","craft","award"
        };

        private static string CorrectWord = "";


        public void OnGet()
        {
            Random rnd = new Random();
            CorrectWord = guessWord[rnd.Next(guessWord.Length)].ToUpperInvariant();
            Debug.WriteLine(CorrectWord);
        }

        public ContentResult OnPostValidate([FromBody] Validated_Word data)
        {
            var guess = string.Concat(data.word).ToUpperInvariant();
            return Content(AnswerCheck(guess));
        }

        private static string AnswerCheck(string word)
        {
            Dictionary<char, int> letterCount = new Dictionary<char, int>();

            for (int i = 0; i < CorrectWord.Length; i++)
            {
                if (letterCount.ContainsKey(CorrectWord[i]))
                {
                    letterCount[CorrectWord[i]]++;
                }
                else
                {
                    letterCount.Add(CorrectWord[i], 1);
                }
            }

            for (int i = 0; i < CorrectWord.Length; i++)
            {
                if (CorrectWord[i] == word[i])
                {
                    letterCount[CorrectWord[i]]--;
                }
            }


            string verdict = "";
            for (int i = 0; i < CorrectWord.Length; i++)
            {

                if (letterCount.ContainsKey(word[i]))
                {
                    if (CorrectWord[i] == word[i])
                    {
                        verdict += "T";
                    }

                    else if (letterCount[word[i]] > 0)
                    {
                        verdict += "C";
                    }

                    else
                    {
                        verdict += "F";
                    }
                    letterCount[word[i]]--;
                }
                else
                {
                    verdict += "F";
                }

            }

            return verdict;
        }

    }




    public record Validated_Word(string word);
}
