export const sendMessageTemplate = ({ name, email, message }: { name: string; email: string; message: string }) => {
    return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #101828; font-family: Arial;">
    <tr>
        <td align="center" style="padding-top: 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="min-height: 72px;">
                <tr>
                    <td align="center">
                        <a href="https://sunnatbakidjanov.codes/" target="_blank" style="font-size: 28px; padding: 5px; font-weight: bold; color: #ff6900; text-decoration: none;">
                            <span style="color: #fff;">Code</span>Forge
                            <img src="cid:logo-codeforge" alt="Logo" style="width: 45px; height: 68px; vertical-align: middle; margin-left: 2px; margin-bottom: 3px;" />
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <tr>
        <td align="center" style="padding-top:10px; padding-bottom: 70px;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 20px; color: #fff; margin: 0 10px;">
                <tr>
                    <td style="padding: 10px 16px 10px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="min-height: 68px;">
                                        <tr>
                                            <td style="vertical-align: middle; padding-right: 8px;">
                                                <span style="font-size: 24px; font-weight: bold;">
                                                New Message
                                                </span>
                                            </td>
                                            <td style="vertical-align: middle;">
                                                <img src="cid:message-icon-codeforge" alt="" style="width: 40px;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.6); margin-bottom: 22px;" />

                        <table cellpadding="0" cellspacing="8" border="0" width="100%" style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 6px 2px; font-size: 16px; font-weight: bold;">
                            <tr>
                                <td style="border-radius: 16px; background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0 10px; height: 48px;">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td valign="middle" style="height: 48px;">
                                                <img src="cid:user-icon-codeforge" width="26" alt="" style="display: block; padding-bottom: 2px;">
                                            </td>
                                            <td valign="middle" style="width: 50px; padding-left: 6px;">Name:</td>
                                            <td valign="middle" style="padding-left: 4px;">${name}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-radius: 16px; background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0 10px; height: 48px;">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td valign="middle" style="height: 48px;">
                                                <img src="cid:email-icon-codeforge" width="26" alt="" style="display: block; padding-bottom: 2px;">
                                            </td>
                                            <td valign="middle" style="width: 50px; padding-left: 6px;">Email:</td>
                                            <td valign="middle" style="padding-left: 4px;">
                                                <a href="mailto:${email}" style="color: #ff6900; text-decoration: none;">${email}</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 16px; background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 4px 12px;">
                            <tr>
                                <td style="text-align: center; font-weight: bold; font-size: 20px; padding-top: 12px;">
                                    Message
                                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.6); margin: 10px 0 16px;" />
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 16px; font-style: italic; padding: 0 10px 16px;">
                                    ${message}
                                </td>
                            </tr>
                        </table>

                        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.6); margin: 20px 0 0 0" />

                        <p style="font-size: 14px; color: #dbdbdb; text-align: center; margin-top: 20px; margin-bottom: 8px;">
                            Sent from
                            <a href="https://sunnatbakidjanov.codes/" target="_blank" style="text-decoration: none; color: #ff6900; font-weight: bold;">
                                <span style="color: #fff;">Code</span>Forge
                            </a>
                            Contact Form
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
    `;
};
