import React from "react";

const AccountSummary = ({accounts}) => {

  const totalIncome= accounts?.reduce((acc,account)=>{
    
    if(account?.initialBalance){
      
      return acc + account?.initialBalance + account?.transactions.reduce((acc2,transaction)=>{
        if(transaction?.transactionType==="Income"){
          return acc2 + transaction?.amount;
        }else{
          return acc2;
        }
      },0);
      
    }else{
      return acc;
    }
    
  },0);


  const totalExpenses= accounts?.reduce((acc,account)=>{
    
    if(account?.transactions){
      
      return acc + account?.transactions.reduce((acc2,transaction)=>{
        if(transaction?.transactionType==="Expenses"){
          return acc2 + transaction?.amount;
        }else{
          return acc2;
        }
      },0);

    }else{
      return acc;
    }
    
  },0);


  // const totalIncome=accounts?.reduce((totalIncome,account)=>{
  //   totalIncome += account?.initialBalance ;
  // totalExpenses= account?.transactions.reduce((totalExpenses,transaction)=>{
  //   (transaction?.transactionType==="Income")? totalIncome += transaction.amount : totalExpenses += transaction.amount;
  //   return totalExpenses;
  //     })});

  // const totalIncome= account?.data?.transactions?.reduce((acc,transaction)=>{
    
  //   if(transaction?.transactionType=== 'Income'){
  //     return acc + transaction?.amount;
  //   }else{
  //     return acc;
  //   }
  // },0);
  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h3 className="mb-4 text-3xl md:text-4xl leading-tight text-coolGray-900 font-bold tracking-tighter">
          Total Income/Expenses of All Accounts
        </h3>
        <p className="text-lg md:text-xl text-coolGray-500 font-medium">
          A list of your company's accounts, either separated by category or in
          chronological order.
        </p>
      </div>
      {accounts?.length > 0 ? (
      <>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-sm text-coolGray-500 font-medium">
                      Total Income
                    </h3>
                  </div>
                  {/* <div className="w-auto p-2">
                    <a href="#">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 6.66666C7.73629 6.66666 7.47851 6.74486 7.25924 6.89137C7.03998 7.03788 6.86908 7.24612 6.76816 7.48975C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25626 7.73988 9.30771C7.99852 9.35916 8.26661 9.33275 8.51025 9.23184C8.75388 9.13092 8.96212 8.96002 9.10863 8.74076C9.25514 8.52149 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66666 8 6.66666ZM3.33333 6.66666C3.06963 6.66666 2.81184 6.74486 2.59257 6.89137C2.37331 7.03788 2.20241 7.24612 2.10149 7.48975C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25626 3.07321 9.30771C3.33185 9.35916 3.59994 9.33275 3.84358 9.23184C4.08721 9.13092 4.29545 8.96002 4.44196 8.74076C4.58847 8.52149 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66666 3.33333 6.66666ZM12.6667 6.66666C12.403 6.66666 12.1452 6.74486 11.9259 6.89137C11.7066 7.03788 11.5357 7.24612 11.4348 7.48975C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25626 12.4065 9.30771C12.6652 9.35916 12.9333 9.33275 13.1769 9.23184C13.4205 9.13092 13.6288 8.96002 13.7753 8.74076C13.9218 8.52149 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66666 12.6667 6.66666Z"
                          fill="#D5DAE1"
                        />
                      </svg>
                    </a>
                  </div> */}
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-black tracking-tighter">
                    ₹ {totalIncome}
                    </h2>
                  </div>
                  {/* <div className="w-auto p-1">
                    <div className="flex items-center px-2 py-1 text-green-500 font-medium text-xs bg-green-100 rounded-full shadow-sm">
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.855 5.64501L6.355 3.14501C6.30745 3.09949 6.25138 3.06381 6.19 3.04001C6.06827 2.99 5.93173 2.99 5.81 3.04001C5.74863 3.06381 5.69255 3.09949 5.645 3.14501L3.145 5.64501C3.09838 5.69163 3.0614 5.74697 3.03617 5.80788C3.01094 5.8688 2.99796 5.93408 2.99796 6.00001C2.99796 6.13316 3.05085 6.26086 3.145 6.35501C3.23915 6.44916 3.36685 6.50206 3.5 6.50206C3.63315 6.50206 3.76085 6.44916 3.855 6.35501L5.5 4.70501V8.50001C5.5 8.63262 5.55268 8.7598 5.64645 8.85356C5.74022 8.94733 5.86739 9.00001 6 9.00001C6.13261 9.00001 6.25979 8.94733 6.35355 8.85356C6.44732 8.7598 6.5 8.63262 6.5 8.50001V4.70501L8.145 6.35501C8.19148 6.40187 8.24678 6.43907 8.30771 6.46446C8.36864 6.48984 8.434 6.50291 8.5 6.50291C8.56601 6.50291 8.63136 6.48984 8.69229 6.46446C8.75322 6.43907 8.80852 6.40187 8.855 6.35501C8.90186 6.30853 8.93906 6.25323 8.96445 6.1923C8.98983 6.13137 9.0029 6.06602 9.0029 6.00001C9.0029 5.934 8.98983 5.86865 8.96445 5.80772C8.93906 5.74679 8.90186 5.69149 8.855 5.64501Z"
                          fill="#22C55E"
                        />
                      </svg>
                      <p>23%</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-sm text-coolGray-500 font-medium">
                      Total Expenses
                    </h3>
                  </div>
                  {/* <div className="w-auto p-2">
                    <a href="#">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 6.66666C7.73629 6.66666 7.47851 6.74486 7.25924 6.89137C7.03998 7.03788 6.86908 7.24612 6.76816 7.48975C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25626 7.73988 9.30771C7.99852 9.35916 8.26661 9.33275 8.51025 9.23184C8.75388 9.13092 8.96212 8.96002 9.10863 8.74076C9.25514 8.52149 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66666 8 6.66666ZM3.33333 6.66666C3.06963 6.66666 2.81184 6.74486 2.59257 6.89137C2.37331 7.03788 2.20241 7.24612 2.10149 7.48975C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25626 3.07321 9.30771C3.33185 9.35916 3.59994 9.33275 3.84358 9.23184C4.08721 9.13092 4.29545 8.96002 4.44196 8.74076C4.58847 8.52149 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66666 3.33333 6.66666ZM12.6667 6.66666C12.403 6.66666 12.1452 6.74486 11.9259 6.89137C11.7066 7.03788 11.5357 7.24612 11.4348 7.48975C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25626 12.4065 9.30771C12.6652 9.35916 12.9333 9.33275 13.1769 9.23184C13.4205 9.13092 13.6288 8.96002 13.7753 8.74076C13.9218 8.52149 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66666 12.6667 6.66666Z"
                          fill="#D5DAE1"
                        />
                      </svg>
                    </a>
                  </div> */}
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-black tracking-tighter">
                    ₹ {totalExpenses}
                    </h2>
                  </div>
                  {/* <div className="w-auto p-1">
                    <div className="flex items-center px-2 py-1 text-green-500 font-medium text-xs bg-green-100 rounded-full shadow-sm">
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.855 5.64501L6.355 3.14501C6.30745 3.09949 6.25138 3.06381 6.19 3.04001C6.06827 2.99 5.93173 2.99 5.81 3.04001C5.74863 3.06381 5.69255 3.09949 5.645 3.14501L3.145 5.64501C3.09838 5.69163 3.0614 5.74697 3.03617 5.80788C3.01094 5.8688 2.99796 5.93408 2.99796 6.00001C2.99796 6.13316 3.05085 6.26086 3.145 6.35501C3.23915 6.44916 3.36685 6.50206 3.5 6.50206C3.63315 6.50206 3.76085 6.44916 3.855 6.35501L5.5 4.70501V8.50001C5.5 8.63262 5.55268 8.7598 5.64645 8.85356C5.74022 8.94733 5.86739 9.00001 6 9.00001C6.13261 9.00001 6.25979 8.94733 6.35355 8.85356C6.44732 8.7598 6.5 8.63262 6.5 8.50001V4.70501L8.145 6.35501C8.19148 6.40187 8.24678 6.43907 8.30771 6.46446C8.36864 6.48984 8.434 6.50291 8.5 6.50291C8.56601 6.50291 8.63136 6.48984 8.69229 6.46446C8.75322 6.43907 8.80852 6.40187 8.855 6.35501C8.90186 6.30853 8.93906 6.25323 8.96445 6.1923C8.98983 6.13137 9.0029 6.06602 9.0029 6.00001C9.0029 5.934 8.98983 5.86865 8.96445 5.80772C8.93906 5.74679 8.90186 5.69149 8.855 5.64501Z"
                          fill="#22C55E"
                        />
                      </svg>
                      <p>8%</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-sm text-coolGray-500 font-medium">
                      Balance
                    </h3>
                  </div>
                  {/* <div className="w-auto p-2">
                    <a href="#">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 6.66666C7.73629 6.66666 7.47851 6.74486 7.25924 6.89137C7.03998 7.03788 6.86908 7.24612 6.76816 7.48975C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25626 7.73988 9.30771C7.99852 9.35916 8.26661 9.33275 8.51025 9.23184C8.75388 9.13092 8.96212 8.96002 9.10863 8.74076C9.25514 8.52149 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66666 8 6.66666ZM3.33333 6.66666C3.06963 6.66666 2.81184 6.74486 2.59257 6.89137C2.37331 7.03788 2.20241 7.24612 2.10149 7.48975C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25626 3.07321 9.30771C3.33185 9.35916 3.59994 9.33275 3.84358 9.23184C4.08721 9.13092 4.29545 8.96002 4.44196 8.74076C4.58847 8.52149 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66666 3.33333 6.66666ZM12.6667 6.66666C12.403 6.66666 12.1452 6.74486 11.9259 6.89137C11.7066 7.03788 11.5357 7.24612 11.4348 7.48975C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25626 12.4065 9.30771C12.6652 9.35916 12.9333 9.33275 13.1769 9.23184C13.4205 9.13092 13.6288 8.96002 13.7753 8.74076C13.9218 8.52149 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66666 12.6667 6.66666Z"
                          fill="#D5DAE1"
                        />
                      </svg>
                    </a>
                  </div> */}
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-black tracking-tighter">
                    ₹ {totalIncome-totalExpenses}
                    </h2>
                  </div>
                  {/* <div className="w-auto p-1">
                    <div className="flex items-center px-2 py-1 text-green-500 font-medium text-xs bg-green-100 rounded-full shadow-sm">
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.855 5.64501L6.355 3.14501C6.30745 3.09949 6.25138 3.06381 6.19 3.04001C6.06827 2.99 5.93173 2.99 5.81 3.04001C5.74863 3.06381 5.69255 3.09949 5.645 3.14501L3.145 5.64501C3.09838 5.69163 3.0614 5.74697 3.03617 5.80788C3.01094 5.8688 2.99796 5.93408 2.99796 6.00001C2.99796 6.13316 3.05085 6.26086 3.145 6.35501C3.23915 6.44916 3.36685 6.50206 3.5 6.50206C3.63315 6.50206 3.76085 6.44916 3.855 6.35501L5.5 4.70501V8.50001C5.5 8.63262 5.55268 8.7598 5.64645 8.85356C5.74022 8.94733 5.86739 9.00001 6 9.00001C6.13261 9.00001 6.25979 8.94733 6.35355 8.85356C6.44732 8.7598 6.5 8.63262 6.5 8.50001V4.70501L8.145 6.35501C8.19148 6.40187 8.24678 6.43907 8.30771 6.46446C8.36864 6.48984 8.434 6.50291 8.5 6.50291C8.56601 6.50291 8.63136 6.48984 8.69229 6.46446C8.75322 6.43907 8.80852 6.40187 8.855 6.35501C8.90186 6.30853 8.93906 6.25323 8.96445 6.1923C8.98983 6.13137 9.0029 6.06602 9.0029 6.00001C9.0029 5.934 8.98983 5.86865 8.96445 5.80772C8.93906 5.74679 8.90186 5.69149 8.855 5.64501Z"
                          fill="#22C55E"
                        />
                      </svg>
                      <p>23%</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>):(<>
      </>)
      }
      
    </>
  );
};

export default AccountSummary;
