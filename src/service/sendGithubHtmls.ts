import { Response } from 'express';

type FnTypes = (res: Response, type: 'error' | 'success', status?: number, message?: string, accessToken?: string) => Response;

export const sendGithubHtml: FnTypes = (res, type, status, message, accessToken) => {
    return res.send(`
        <html>
            <body>
                <script>
                    window.opener?.postMessage(
                        {
                            source: "github-auth",
                            type: "${type}",
                            status: "${status}",
                            message: "${message}",
                            accessToken: "${accessToken}"
                        },
                        "*"
                    );

                    window.close();
                </script>
            </body>
        </html>
    `);
};
