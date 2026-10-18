using System;
using System.Diagnostics;
using System.IO;
using System.Text;

namespace AntigravityRollback
{
    class Program
    {
        static int Main(string[] args)
        {
            try
            {
                Console.OutputEncoding = Encoding.UTF8;
                try { Console.InputEncoding = Encoding.UTF8; } catch { }
                Console.Title = "Antigravity 순정 원본 복구(롤백) v5.0";

                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string scriptPath = Path.Combine(baseDir, "rollback_engine.ps1");

                if (!File.Exists(scriptPath))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("[오류] rollback_engine.ps1 파일을 찾을 수 없습니다.");
                    Console.WriteLine("압축을 완전히푼 후 같은 폴더에 파일들이 모두 존재하는지 확인해주세요.");
                    Console.ResetColor();
                    WaitForKeyPress();
                    return 1;
                }

                string psArgs = "-NoProfile -ExecutionPolicy Bypass -File \"" + scriptPath + "\"";
                if (args.Length > 0)
                {
                    psArgs += " " + string.Join(" ", args);
                }

                ProcessStartInfo psi = new ProcessStartInfo
                {
                    FileName = "powershell.exe",
                    Arguments = psArgs,
                    WorkingDirectory = baseDir,
                    UseShellExecute = false,
                    CreateNoWindow = false
                };

                using (Process proc = Process.Start(psi))
                {
                    proc.WaitForExit();
                    int exitCode = proc.ExitCode;

                    Console.WriteLine();
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("==================================================================");
                    Console.WriteLine(" 작업을 마쳤습니다. 창을 닫으려면 아무 키나 누르십시오...");
                    Console.WriteLine("==================================================================");
                    Console.ResetColor();
                    WaitForKeyPress();
                    return exitCode;
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("[예외 발생] " + ex.Message);
                Console.ResetColor();
                WaitForKeyPress();
                return 1;
            }
        }

        static void WaitForKeyPress()
        {
            try
            {
                if (!Console.IsInputRedirected)
                {
                    Console.ReadKey(true);
                }
            }
            catch
            {
                // Ignore key read exceptions in non-interactive environments
            }
        }
    }
}
