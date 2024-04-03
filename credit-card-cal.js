 // ====== Credit card calculator scripts start ====== //
 const credit_calc = document.querySelector(".credit-cd-Payt-cal");
 if (credit_calc) {

     // --------- Start initializing variables --------- //
     let credFieldValidated;
     const credAmount = document.querySelector('#CREDIT_AMOUNT');
     const credDesiredMonths = document.querySelector("#DESIRED_MONTHS");
     const credMonthlyPay = document.querySelector('#MONTHLY_PAY');
     const credInterestRate = document.querySelector('#CREDIT_INTEREST_RATE');
     const creditCalculateBtn = document.querySelector('#cred-button');
     // --------- End initializing variables --------- //

     // --------- Start input validation logic --------- //
     const validateCredInput = (credInputField, credMinValue, credErrorColor) => {
         if (["DESIRED_MONTHS", "MONTHLY_PAY"].includes(credInputField.id) && credInputField.value === '') {
             credInputField.style.webkitTextFillColor = '#000000';
             credInputField.style.caretColor = '#000000';
             credInputField.style.borderColor = '#ced4da';
             credInputField.style.backgroundColor = '#f4f4f4';
             return false;
         }
         if (credInputField.value === '' || parseFloat(credInputField.value) < credMinValue) {
             credInputField.style.webkitTextFillColor = credErrorColor;
             credInputField.style.caretColor = credErrorColor;
             credInputField.style.borderColor = credErrorColor;
             credInputField.style.backgroundColor = '#eb474736';
             return false;
         } else {
             credInputField.style.webkitTextFillColor = '#000000';
             credInputField.style.caretColor = '#000000';
             credInputField.style.borderColor = '#ced4da';
             credInputField.style.backgroundColor = '#f4f4f4';
             return true;
         }
     };
     // --------- End input validation logic --------- //

     // --------- Start payoff formatting  --------- //
     function formatPayoffTime(months) {
         if (months < 12) {
             return months + " months";
         } else {
             const years = Math.floor(months / 12);
             const remainingMonths = months % 12;

             let result = "";
             if (years > 0) {
                 result += years + " year";
                 if (years > 1) {
                     result += "s";
                 }
             }

             if (remainingMonths > 0) {
                 result += " " + remainingMonths + " month";
                 if (remainingMonths > 1) {
                     result += "s";
                 }
             }

             return result;
         }
     }
     // --------- End payoff formatting  --------- //

     function calculateTotalInterest(outstandingBalance, monthlyPayment, monthlyInterestRate, months) {
         let totalInterest = 0;
         let balance = outstandingBalance;

         for (let i = 0; i < months; i++) {
             const monthlyInterest = balance * monthlyInterestRate;
             totalInterest += monthlyInterest;
             balance -= monthlyPayment - monthlyInterest;
         }

         return Math.round(totalInterest);
     }

     // --------- Start credit card calculation --------- //
     const creditResult = document.querySelector(".credit-card-result");

     const calculateMonthlyPay = () => {
         var outstandingBalance = parseFloat(credAmount.value);
         var monthlyInterestRate = parseFloat(credInterestRate.value) / 100 / 12;
         var desiredMonths = parseFloat(credDesiredMonths.value);

         const credNumerator = outstandingBalance * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), desiredMonths);
         const credDenominator = Math.pow((1 + monthlyInterestRate), desiredMonths) - 1;

         var credLoanEMI = credNumerator / credDenominator;
         credLoanEMI = Math.round(credLoanEMI);

         const totalInterestPaid = (credLoanEMI * desiredMonths - outstandingBalance).toLocaleString('en-IN');
         const totalPaid = (credLoanEMI * desiredMonths).toLocaleString('en-IN');

         creditResult.innerHTML = `
     <div class="month-pay totalInvest-values">
     <h3>Monthly Payment</h3>
     <p>$${credLoanEMI.toLocaleString('en-IN')}</p>
     </div>
     <div class="totl-interest totalInvest-values">
     <h3>Total Interest</h3>
     <p>$${totalInterestPaid}</p>
     </div>
     <div class="totl Pricpal totalInvest-values">
     <h3>Total Paid</h3>
     <p>$${totalPaid}</p>
     </div>
   `;
     };

     const calculatePayoffTime = () => {
         var outstandingBalance = parseFloat(credAmount.value);
         var monthlyPayment = parseFloat(credMonthlyPay.value);
         var monthlyInterestRate = parseFloat(credInterestRate.value) / 100 / 12;

         const thresholdMonths = 100;

         // Check if monthly payment is greater than outstanding balance
         if (monthlyPayment >= outstandingBalance) {
             const totalInterestPaid = calculateTotalInterest(outstandingBalance, monthlyPayment, monthlyInterestRate, 1);
             const totalPaid = outstandingBalance + totalInterestPaid;
             creditResult.innerHTML = `
     <div class="month-pay totalInvest-values">
     <h3>Monthly Payment</h3>
     <p>$${monthlyPayment.toLocaleString('en-IN')}</p>
     </div>
     <div class="totl-interest totalInvest-values">
     <h3>Total Interest</h3>
     <p>$${totalInterestPaid.toLocaleString('en-IN')}</p>
     </div>
     <div class="totl Pricpal totalInvest-values">
     <h3>Total Paid</h3>
     <p>$${totalPaid.toLocaleString('en-IN')}</p>
     </div>
     <div class="month-to-payoff totalInvest-values">
     <h3>Months To Payoff</h3>
     <p>1 month</p>
     </div>
   `;
             return;
         }

         // Calculate the number of months required to pay off the debt
         let monthsToPayoff = 0;
         var balance = outstandingBalance;

         // Calculate monthly interest and interest payment
         const monthlyInterest = monthlyInterestRate;
         const interestPayment = balance * monthlyInterest;

         while (balance > 0) {
             // Apply monthly payment
             const principalPayment = monthlyPayment - interestPayment;
             balance -= principalPayment;

             // Check if balance becomes negative
             if (balance < 0) {
                 break;
             }

             // Increment the number of months
             monthsToPayoff++;

             // Check if exceeded threshold months
             if (monthsToPayoff > thresholdMonths) {
                 const remainingDebt = balance + (monthsToPayoff - thresholdMonths) * monthlyPayment;
                 creditResult.innerHTML = `
     <div class="text-secondary d-flex justify-content-center w-100 align-items-center mb-0" role="alert">
       <svg xmlns="http://www.w3.org/2000/svg" fill="#ffbf02" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:" width="20" height="20">
         <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
       </svg>
         Your monthly payment is insufficient to cover the accumulated interest. After ${thresholdMonths} months, you will still have a credit card debt of $${Math.round(remainingDebt).toLocaleString('en-IN')}.
      </div>`;
                 return; // Exit the function
             }
         }

         const formattedPayoffTime = formatPayoffTime(monthsToPayoff);
         const totalInterestPaid = calculateTotalInterest(outstandingBalance, monthlyPayment, monthlyInterestRate, monthsToPayoff);
         const totalPaid = outstandingBalance + totalInterestPaid;
         creditResult.innerHTML = `
   <div class="month-pay totalInvest-values">
     <h3>Monthly Payment</h3>
     <p>$${monthlyPayment.toLocaleString('en-IN')}</p>
   </div>
   <div class="totl-interest totalInvest-values">
     <h3>Total Interest</h3>
     <p>$${totalInterestPaid.toLocaleString('en-IN')}</p>
   </div>
   <div class="totl Pricpal totalInvest-values">
     <h3>Total Paid</h3>
     <p>$${totalPaid.toLocaleString('en-IN')}</p>
   </div>
   <div class="month-to-payoff totalInvest-values">
     <h3>Months To Payoff</h3>
     <p>${formattedPayoffTime}</p>
   </div>
   `;
     };

     // --------- End credit card calculation --------- //

     // --------- Start to add event listener to fields --------- //
     const credInputFields = document.querySelectorAll('input');
     credInputFields.forEach((field) => {
         field.addEventListener('copy', (event) => {
             event.preventDefault();
         });

         field.addEventListener('paste', (event) => {
             event.preventDefault();
         });

         if (field.id === 'MONTHLY_PAY' || field.id === 'DESIRED_MONTHS') {
             field.addEventListener('focus', (event) => {
                 if (field.id === 'MONTHLY_PAY') {
                     credDesiredMonths.value = '';
                     credFieldValidated = false;
                 } else if (field.id === 'DESIRED_MONTHS') {
                     credMonthlyPay.value = '';
                     credFieldValidated = false;
                 }
             });
         }

         field.addEventListener('input', (event) => {
             if (field.id === 'CREDIT_AMOUNT' || field.id === 'CREDIT_INTEREST_RATE' || field.id === 'MONTHLY_PAY' || field.id === 'DESIRED_MONTHS') {
                 credFieldValidated = validateCredInput(field, 1, '#eb4739ab');
             }
         });
     });
     // --------- End to add event listener to fields --------- //

     // --------- Start to add event listener to convert btn --------- //
     creditCalculateBtn.addEventListener('click', () => {
         if (credFieldValidated) {
             var isDesiredMonths = credDesiredMonths.value;
             var isMonthlyPay = credMonthlyPay.value;

             if (
                 (isNaN(isDesiredMonths) || isDesiredMonths === '' || isDesiredMonths === 0)
                 &&
                 (!isNaN(isMonthlyPay) || isMonthlyPay !== '' || isMonthlyPay !== 0)
             ) {
                 calculatePayoffTime();
             } else {
                 if (isDesiredMonths > 1000) {
                     creditResult.innerHTML = `
           <div class="text-danger d-flex justify-content-center w-100 align-items-center mb-0" role="alert">
             <svg xmlns="http://www.w3.org/2000/svg" fill="#842029" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:" width="20" height="20">
               <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
             </svg>
             <div>You have surpassed the maximum threshold for debt repayment.</div>
            </div>`;
                     return; // Exit the function
                 }
                 calculateMonthlyPay();
             }
         }
     });
     // --------- End to add event listener to convert btn --------- //

     // --------- Start to add event listener to DOM --------- //
     document.addEventListener('DOMContentLoaded', calculatePayoffTime);
     // --------- End to add event listener to DOM --------- //
 }
 // ====== Credit card calculator scripts end ====== //
