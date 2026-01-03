import { Response } from 'express';

type FnTypes = (res: Response, type: 'error' | 'success', status?: number, message?: string) => Response;

export const sendGithubHtml: FnTypes = (res, type, status, message) => {
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
                        },
                        "*"
                    );

                    window.close();
                </script>
            </body>
        </html>
    `);
};
