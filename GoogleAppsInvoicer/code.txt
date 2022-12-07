const ui = SpreadsheetApp.getUi();
const ss = SpreadsheetApp.getActiveSpreadsheet();
let emailMsg = "";

function invoiceStudent() {
  const stuSheet = ss.getSheetByName('StudentData');
  
  const info = stuSheet.getActiveRange().getValues();
  const student = getStudent(info);
  
  // Update invoice number, set info to invoice template and email student.
  if (promptUser(student.fname, student.sname).getSelectedButton() == ui.Button.YES){
    
    // Don't update invnum during testing.
    if (student.email !== "wyreznet@gmail.com")
      updateInvNum(stuSheet);
    
    const invSheet = SpreadsheetApp.openById('1lPY_K6c5XE2TuqYkS7SIiYz3OXNnQBnL5IZw5ylHu84');
    
    // Clear values then set and commit values.
    invSheet.getRange("A16:H22").setValue("");
    setInvoiceValues(invSheet, student);
    SpreadsheetApp.flush();
    
    // Email invoice
    MailApp.sendEmail(createEmail(student.email, student.fname, emailMsg, invSheet));
    
    // Save record of the invoice being sent
    saveData(student);
  }
}

function promptUser(fname, sname){
 const conf = ui.prompt('Invoicing: ' + fname +' '+sname,
    'Do you want to send this email? Include a personalised message to the recipient (optional): ',
    ui.ButtonSet.YES_NO);

  emailMsg = conf.getResponseText();
  
  // Add a 'space' after the user input message if there isn't one.
  if (emailMsg.length > 0){
    if (emailMsg.charAt(emailMsg.length-1) != ' ')
     emailMsg += " ";
  }

  return conf;
}

function updateInvNum(stuSheet){

  // Update invoice number
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear()-2000;
  
  const invMonth = stuSheet.getRange('E2').getValue();
  stuSheet.getRange('F2').setValue(year);
   if (month != invMonth){
      stuSheet.getRange('C2').setValue(1);
      stuSheet.getRange('E2').setValue(month);
    } else {
      let numOfInv = stuSheet.getRange('C2').getValue()+1;
      stuSheet.getRange('C2').setValue(numOfInv);
    }
  
}

function saveData(student){
  const recSheet = ss.getSheetByName('InvRecords');
  const row = recSheet.getLastRow()+1;
  
  const data = 
  [String(formatDate(new Date()))
  ,student.email
  ,student.fname+" "+student.sname
  ,student.date
  ,student.numOfService+" "+student.service
  ,invoiceTotal(student)
  ,student.cancellations.toString()];
  
   for (let i = 0; i < data.length; i++)
     recSheet.getRange(row, i+1).setValue(data[i]);
}

function invoiceTotal(student){
  // Number of service items * the cost per item, minus the expected amount per cancellation.
  return (student.numOfService * student.costPerService) - ((student.cancellations.length > 0 ? student.cancellations.length : 0) * (student.costPerService-50))
}

function setInvoiceValues(invSheet, student){
  
  // Student
  invSheet.getRange("D12:D12").setValue(student.fname+" "+student.sname); 
  
  // InvNum
  invSheet.getRange("H8:H8").setValue(ss.getRange("A2:A2").getValue()); 
  
  // Date
  invSheet.getRange("B16:B16").setValue(student.date); 
  
  // NumOfService (ie '1x' <--- piano lessons)
  invSheet.getRange("C16:C16").setValue(student.numOfService);
  
  // Service
  service = student.service+ " at $"+student.costPerService;
  if (student.numOfService > 1)
    service += " ea"
  
  invSheet.getRange("d16:d16").setValue(service);
  
  // Subtotal
  invSheet.getRange("h16:h16").setValue(student.numOfService * student.costPerService);
  
  // Cancellations
  if (student.cancellations.length > 0){
    let num = 17;
    for (let i = 0; i < student.cancellations.length; i++){
      if (student.cancellations[i].length > 0){
        invSheet.getRange("b"+num+":b"+num).setValue(student.cancellations[i]);
        invSheet.getRange("c"+num+":c"+num).setValue("Cancellation Credit");
        invSheet.getRange("h"+num+":h"+num).setValue(parseInt("-"+(student.costPerService - 50)));
        num++;
      }
    }
  }

  // Total: H24
}

function formatDate(inDate){
  return Utilities.formatDate(inDate, 'GMT+8:00', 'dd/MM/yyyy');
}

function getStudent(infoFromRange){ // prepare info as a student object
     
  const student = {
    email : infoFromRange[0][0],
    fname : infoFromRange[0][1],
    sname : infoFromRange[0][2],
    date : formatDate(infoFromRange[0][3]),
    numOfService: infoFromRange[0][4],
    service : "x  " +infoFromRange[0][5],
    cancellations : (infoFromRange[0][7].length > 0 ? infoFromRange[0][7].split(",") : ""),
    costPerService : infoFromRange[0][6],
  }
  return student;
}

function createEmail(sEmail, sFName, msg, invoice){



  let emailBody = HtmlService.createHtmlOutputFromFile('BMInvoice').getContent();
  emailBody = emailBody.replace("##name", sFName);
  emailBody = emailBody.replace("##msg", msg);  

  const email = {
    to: sEmail,
    subject: "Invoice for Music Lessons/Services",
    htmlBody: emailBody,
    name: "Ben Matthews",
    bcc: "wyreznet@gmail.com",
    attachments: [invoice.getAs(MimeType.PDF).setName("BM Invoice.pdf")]
  }
  return email;
}
