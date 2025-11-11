import { templateColors } from '../utils/templateColors';

export const sendMessageTemplate = ({ name, email, message }: { name: string; email: string; message: string }) => {
    const { mainBgColor, secondaryBgColor, thirdBgColor, textColor, accentTextColor, lineColor } = templateColors;

    return `
<div style="background-color: ${mainBgColor};">
    <div style="margin: 0 auto; max-width: 604px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
            <tr>
                <td style="direction:ltr; padding: 0; font-size: 0; text-align:center;">                    
                    <div style="background: ${mainBgColor}; background-color: ${mainBgColor}; margin: 0 auto; max-width: 604px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${mainBgColor}; background-color: ${mainBgColor}; width: 100%;">
                            <tr>
                                <td style="padding: 20px 0 2px; width: 100%;">
                                    <a href="https://sunnatbakidjanov.codes/" target="_blank" style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: ${textColor}; font-weight: bold; font-size: 24px;">
                                        Code<span style="color: ${accentTextColor};">Forge</span>
                                        <img src="cid:logo-codeforge" alt="" width="38" height="57" style="border:0; display:inline-block; outline:none; text-decoration:none; height:57px; width:38px; vertical-align: middle; margin-bottom: 2px;"/>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                
                    <div style="margin: 0 auto; max-width: 604px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                                <td style="padding: 0; text-align: center;">
                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; border-radius: 8px 8px 0 0; margin: 0 auto; max-width: 604px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; border-radius: 8px 8px 0 0; width: 100%;">
                                            <tr>
                                                <td style="padding: 10px 20px 0; text-align: center;">
                                                    <div style="width: 100%;">
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
                                                            <tr>
                                                                <td>
                                                                    <div style="font-family: Arial, Helvetica, sans-serif; color: ${textColor}; font-weight: bold; font-size: 22px;">
                                                                        New Message
                                                                    </div>
                                                                </td>
                                                                <td style="padding-left: 8px; width: 36px;">
                                                                    <div style="background: transparent; background-color: transparent;">
                                                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="background: transparent; background-color: transparent;">
                                                                            <tr>
                                                                                <td align="center" valign="middle">
                                                                                    <img src="cid:message-icon-codeforge" alt="" style="display:block; border:0; outline:none; text-decoration:none;" width="36" height="54">
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; margin: 0 auto; max-width: 604px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%;">
                                            <tr>
                                                <td style="padding: 0 20px; text-align: center;">
                                                    <p style="font-family: Arial, Helvetica, sans-serif; margin: 0 auto; font-size: 16px; font-style: italic; color: ${textColor};">You have received a new message from the <span style="color: ${accentTextColor};">contact form</span></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; margin: 0 auto; max-width: 604px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%;">
                                            <tr>
                                                <td style="padding: 10px 20px 25px; text-align: center;">
                                                    <p style="margin: 0; width: 100%; border-top: 1px solid ${lineColor};"> </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; margin: 0 auto; max-width: 604px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%;">
                                            <tr>
                                                <td style="padding: 0 20px; text-align: center;">
                                                    <div style="background: ${thirdBgColor}; background-color: ${thirdBgColor}; width: 100%; border-radius: 8px 8px 0 0;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${thirdBgColor}; background-color: ${thirdBgColor}; width: 100%; border-radius: 8px 8px 0 0;">
                                                            <tr>
                                                                <td style="padding: 15px 10px 4px;">
                                                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 8px;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 8px;">
                                                                            <tr>
                                                                                <td style="padding: 4px 6px; height: 35px;">
                                                                                    <div style="width: 100%;">
                                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; border-collapse: collapse;">
                                                                                            <tr>
                                                                                                <td style="width: 22px; padding-right: 5px;">
                                                                                                    <img src="cid:user-icon-codeforge" width="22" height="33" alt="" style="vertical-align: middle;">
                                                                                                </td>
                                                                                                <td style="text-align: left; width: 55px;">
                                                                                                    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: ${textColor}; padding-top: 2px; font-weight: bold;">Name: </p>
                                                                                                </td>
                                                                                                <td style="text-align: left;">
                                                                                                    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: ${textColor}; padding-top: 2px;">${name}</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                
                                                    <div style="background: ${thirdBgColor}; background-color: ${thirdBgColor}; width: 100%;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${thirdBgColor}; background-color: ${thirdBgColor}; width: 100%;">
                                                            <tr>
                                                                <td style="padding: 4px 10px 4px;">
                                                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 8px">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 8px;">
                                                                            <tr>
                                                                                <td style="padding: 4px 6px; height: 35px;">
                                                                                    <div style="width: 100%;">
                                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; border-collapse: collapse;">
                                                                                            <tr>
                                                                                                <td style="width: 22px; padding-right: 5px;">
                                                                                                    <img src="cid:email-icon-codeforge" width="22" height="33" alt="" style="vertical-align: middle;">
                                                                                                </td>
                                                                                                <td style="text-align: left; width: 55px;">
                                                                                                    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: ${textColor}; padding-top: 2px; font-weight: bold;">Email: </p>
                                                                                                </td>
                                                                                                <td style="text-align: left;">
                                                                                                    <a href="mailto:${email}" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: ${accentTextColor}; text-decoration: none;">${email}</a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                
                                                    <div style="background: ${thirdBgColor}; background-color: ${thirdBgColor}; width: 100%; border-radius: 0 0 8px 8px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${thirdBgColor}; background-color: ${thirdBgColor}; width: 100%; border-radius: 0 0 8px 8px;">
                                                            <tr>
                                                                <td style="padding: 4px 10px 15px;">
                                                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 8px">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 8px;">
                                                                            <tr>
                                                                                <td style="padding: 14px 6px 16px;">
                                                                                    <div style="width: 100%;">
                                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                                                                            <tr>
                                                                                                <div style="width: 100%;">
                                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                                                                                        <tr>
                                                                                                            <td style="padding: 0;">
                                                                                                                <p style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; color: ${textColor}; margin: 0;">Message</p>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div>
                
                
                                                                                                <div style="width: 100%;">
                                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                                                                                        <tr>
                                                                                                            <td style="padding: 6px 10px 10px; text-align: center;">
                                                                                                                <p style="margin: 0; width: 100%; border-top: 1px solid ${lineColor};"> </p>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div>
                
                                                                                                <div style="width: 100%;">
                                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                                                                                        <tr>
                                                                                                            <td style="text-align: left; padding: 0 20px">
                                                                                                                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.25; color: ${textColor}; font-style: italic;">${message}</p>        
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; margin: 0 auto; max-width: 604px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%;">
                                            <tr>
                                                <td style="padding: 25px 20px 10px; text-align: center;">
                                                    <p style="margin: 0; width: 100%; border-top: 1px solid ${lineColor};"> </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; border-radius: 0 0 8px 8px; margin: 0 auto; max-width: 604px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: ${secondaryBgColor}; background-color: ${secondaryBgColor}; width: 100%; border-radius: 0 0 8px 8px;">
                                            <tr>
                                                <td style="padding: 0; text-align: center;">
                                                    <p style="padding: 5px 20px 20px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; font-style: italic; color: ${textColor}; font-size: 14px;">
                                                        © Code<span style="color: ${accentTextColor};">Forge</span> — Crafted Interfaces. Forged for Developers.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div style="width: 100%; height: 45px; line-height: 45px;">&hairsp;</div>
                </td>
            </tr>
        </table>
    </div>
</div>
    `;
};
