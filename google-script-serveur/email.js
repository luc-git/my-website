/******************************************************************************
 * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
 * But has been simplified and cleaned up to make it more beginner friendly   *
 * All credit still goes to Martin and any issues/complaints/questions to me. *
 ******************************************************************************/

// if you want to store your email server-side (hidden), uncomment the next line
// Ajoutez ci-dessous l'adresse email à laquelle vous voulez envoyer un email depuis le formulaire html présent dans "contact.html"
var TO_ADDRESS = "nutrizik@gmail.com";

// Ajoutez la clé secret de votre recaptcha dans "'secret'" https://developers.google.com/recaptcha/docs/verify?hl=fr#api_request

function Captcha(token) {
  var payload = {
    'secret': '6LeaaTckAAAAAFKOSzVKJKzACnhAJg7mqwy8EXYf',
    'response': token
  }
  var url = 'https://www.google.com/recaptcha/api/siteverify';
  var resp = UrlFetchApp.fetch(url, {
    payload: payload,
    method: 'POST'
  }).getContentText();
  return JSON.parse(resp).success;
}

// spit out all the keys/values from the form in HTML for email
// uses an array of keys if provided or the object to determine field order
function formatMailBody(obj, order) {
  var result = "";
  if (!order) {
    order = Object.keys(obj);
  }

  // loop over all keys in the ordered form data
  for (var idx in order) {
    var key = order[idx];

    if (key !== "object" && key !== "email" && key !== "g-recaptcha-response") {
      result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + "</h4><div>" + sanitizeInput(obj[key]) + "</div>";
      // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value, 
      // and append it to the `result` string created at the start.
    }

  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}

// sanitize content from the user - trust no one 
// ref: https://developers.google.com/apps-script/reference/html/html-output#appendUntrusted(String)
function sanitizeInput(rawInput) {
  var placeholder = HtmlService.createHtmlOutput(" ");
  placeholder.appendUntrusted(rawInput);

  return placeholder.getContent();
}

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger

    // shorter name for form data
    var mailData = e.parameters;

    // names and order of form elements (if set)
    var orderParameter = e.parameters.formDataNameOrder;
    var dataOrder;
    if (orderParameter) {
      dataOrder = JSON.parse(orderParameter);
    }

    // determine recepient of the email
    // if you have your email uncommented above, it uses that `TO_ADDRESS`
    // otherwise, it defaults to the email provided by the form's data attribute
    var sendEmailTo = (typeof TO_ADDRESS !== "undefined") ? TO_ADDRESS : mailData.formGoogleSendEmail;

    // send email if to address is set
    if (sendEmailTo && Captcha(String(mailData['g-recaptcha-response']))) {
      MailApp.sendEmail({
        to: String(sendEmailTo),
        subject: String(mailData.object),
        replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
        htmlBody: formatMailBody(mailData, dataOrder)
      });
    }

    /*return ContentService    // return json success results
      .createTextOutput(
        JSON.stringify({
          "result": "success",
          "data": JSON.stringify(e.parameters),
        }))
      .setMimeType(ContentService.MimeType.JSON);*/
    return doGet()
  } catch (error) { // if error return this
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(){
  return HtmlService.createHtmlOutputFromFile('index').setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('Merci');
}