export const sendVerifyCodeTemplate = ({ verifyCode }: { verifyCode: string }) => {
    const codeForgeLink = 'https://sunnatbakidjanov.codes/';
    const cidEmailImg = 'https://i.sunnatbakidjanov.codes/imgs/send-code-codeforge.png';

    return `
    <div bgcolor="#e5e7eb" style="margin:0; padding:0; min-width:100%; background-color:#e5e7eb font-style: normal !important; -webkit-text-size-adjust: 100%; font-family: Arial, Verdana, sans-serif !important;">
        <center style="width: 100%; table-layout: fixed; background-color: #e5e7eb; padding-top: 0px; padding-bottom: 0px;">
            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                <tbody>
                    <tr>
                        <td align="center" style="padding: 0px 0px 0px 0px;">
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px 20px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="padding: 40px 0 0 0; text-align: center; font-style: normal !important;">
                                                                            <a href="${codeForgeLink}" style="font-family: Arial, Verdana, sans-serif; text-align: center; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size: 36px; color: #ffffff; text-decoration: none; font-weight: bold;">
                                                                                Code<span style="color:#ff6900;">Forge</span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 20px 20px 0px 20px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                        &nbsp;
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" style="padding: 0px 0px 0px 0px; text-align: center;">
                                                                            <img src="${cidEmailImg}" alt="CodeForge verification" width="600" height="420" style="display: block; width: 100%; max-width: 600px; height: auto; text-decoration: none;">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table bgcolor="#18191b" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #18191b; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#18191b" style="padding: 0px; background-color: #18191b;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="padding: 40px 15px 0 15px; text-align: center; font-style: normal !important;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size: 26px; color: #ffffff; text-decoration: none; font-weight: bold; line-height: 23px;">Verification needed</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="left" style="padding: 30px 15px 0px 15px; text-align: center; font-style: normal !important;">
                                                                           <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                We've received a request to verify your email.
                                                                                <br>
                                                                                Your verification <span style="color: #ff6900; font-weight: bold;">code</span> has been <span style="color: #ff6900; font-weight: bold;">forged</span> and is ready for use:
                                                                           </p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 25px 40px 0px 40px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                        &nbsp;
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 40px 0px 0px 0px;">
                                                                            <table bgcolor="#000000" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 6px 80px; border: 1px solid #ff6900; background-color: #000000; text-align: center; border-radius: 6px;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="left" width="100%" style="font-family:Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size:32px; font-weight:bold; color: #ffffff;">
                                                                                            ${verifyCode}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 40px 40px 0px 40px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                        &nbsp;
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 30px 15px 40px 15px; font-style: normal !important;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                Use it within <span style="color: #ff6900; font-weight: bold;">15 minutes</span> to prove your identity.
                                                                                <br>
                                                                                The <span style="color: #ff6900; font-weight: bold;">Forge</span> awaits your action!
                                                                           </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table  bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tr>
                                                                    <td align="left" style="padding: 50px 15px 0 15px; text-align: center; font-style: normal !important;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                If you did <span style="color: #ff6900; font-weight: bold;">not request</span> this code, please <span style="color: #ff6900; font-weight: bold;">ignore</span> this <span style="color: #ff6900; font-weight: bold;">email</span>.
                                                                                <br>
                                                                                For your security, <span style="color: #ff6900; font-weight: bold;">never share</span> this code with anyone.
                                                                           </p>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="center" style="padding: 60px 60px 0px 60px;">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                            <tr>
                                                                                <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                    &nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="leftt" style="padding: 20px 15px 50px 15px; text-align: center; font-style: normal !important;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal !important; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px; font-weight: 700;">
                                                                                © Code<span style="color: #ff6900;">Forge</span>. All rights reserved.
                                                                           </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </center>
    </div>
    `;
};
