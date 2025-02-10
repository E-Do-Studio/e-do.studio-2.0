import { ContactFormValues } from '@/validations/contact-form-schema'

interface ContactTemplateProps extends ContactFormValues { }

export function ContactTemplate({
  firstName,
  lastName,
  email,
  society,
  website,
  message,
}: ContactTemplateProps) {
  // Définir l'URL de base pour les images
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.e-do.studio'

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>Confirmation de réception</title>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      width: 100%;
      font-family: roboto, 'helvetica neue', helvetica, arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div>
      <table width="100%" style="text-align: center; border-spacing: 0">
        <tbody>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <img
                src="${baseUrl}/images-mail/banniere.jpg"
                alt="Bannière"
                style="
                  display: block;
                  border: 0;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
                "
                width="600"
              />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <img
                src="${baseUrl}/images-mail/message.jpg"
                alt="Message"
                style="max-width: 1080px; padding: 0; border-width: 0"
                width="600"
              />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <img
                src="${baseUrl}/images-mail/studio.jpg"
                alt="Studio"
                style="max-width: 3052px; padding: 0; border-width: 0"
                width="600"
              />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <table width="600" style="text-align: center; border-spacing: 0">
                <tbody>
                  <tr>
                    <td
                      style="
                        background-color: #000000;
                        color: white;
                        font-size: 20px;
                        padding: 0;
                      "
                    >
                      <p
                        style="
                          text-align: left;
                          margin: 40px 40px 10px 40px;
                          line-height: 1.4;
                        "
                      >
                        Vous ne ne souhaitez plus attendre ? Réservez dès
                        maintenant votre session sur l'un de nos équipements !
                      </p>
                      <img
                        src="${baseUrl}/images-mail/arrow.jpg"
                        alt="Flèche"
                        style="max-width: 3052px; padding: 0; border-width: 0"
                        width="600"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <table width="600" style="text-align: center; border-spacing: 0">
                <tbody>
                  <tr>
                    <td
                      style="
                        width: 600px;
                        background-color: #000000;
                        text-align: center;
                        padding: 0;
                      "
                    >
                      <a href="https://www.e-do.studio/reservation"
                        ><button
                          style="
                            background-color: white;
                            color: black;
                            border-radius: 100px;
                            border: none;
                            height: 60px;
                            width: 209px;
                            font-size: 16px;
                            cursor: pointer;
                          "
                        >
                          Réservez votre session
                        </button></a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <img
                src="${baseUrl}/images-mail/location.jpg"
                alt="Location"
                style="max-width: 1080px; padding: 0; border-width: 0"
                width="600"
              />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; margin: 0; font-size: 0px">
              <table width="600" style="background-color: #ffffff">
                <tbody>
                  <tr>
                    <td align="center">
                      <table width="120" style="background-color: #ffffff">
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              style="
                                padding-right: 5px;
                                padding-left: 5px;
                                max-width: 50px;
                                font-size: 0px;
                              "
                            >
                              <a
                                href="https://www.linkedin.com/company/71198538/admin/"
                                target="_blank"
                                ><img
                                  src="${baseUrl}/images-mail/linkedin.png"
                                  style="display: block"
                                  width="50"
                                  alt="LinkedIn"
                              /></a>
                            </td>
                            <td
                              align="left"
                              style="
                                padding-right: 5px;
                                padding-left: 5px;
                                max-width: 50px;
                                font-size: 0px;
                              "
                            >
                              <a
                                href="https://www.facebook.com/EdoStudioAgency"
                                target="_blank"
                                ><img
                                  src="${baseUrl}/images-mail/facebook.png"
                                  style="display: block"
                                  width="50"
                                  alt="Facebook"
                              /></a>
                            </td>
                            <td
                              align="left"
                              style="
                                padding-right: 5px;
                                padding-left: 5px;
                                max-width: 50px;
                                font-size: 0px;
                              "
                            >
                              <a
                                href="https://www.instagram.com/edostudio/"
                                target="_blank"
                                ><img
                                  src="${baseUrl}/images-mail/instagram.png"
                                  style="display: block"
                                  width="50"
                                  alt="Instagram"
                              /></a>
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
    </div>
  </body>
</html>
  `
} 