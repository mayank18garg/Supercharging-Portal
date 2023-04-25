import React from 'react';
import './IntroTable.css';

const tableData = [
    { Urgency: 'Urgent', Issues: 'Critical Issues or Emergencies only', Contact: '+31 20 258 3966', Follow: 'Your phone message will be distributed immediately to a wide range of people on our team for escalation and response.' },
    { Urgency: 'Non-Urgent', Issues: 'Payment & Invoicing', Contact: 'Charging-accountspayable@tesla.com', Follow: 'A member of the Operations team will reply.' },
    { Urgency: 'Non-Urgent', Issues: 'Questions, Concerns, Service or Site Operations Issues', Contact: 'Supercharger-EU@tesla.com', Follow: 'A member of the Operations team will reply.' },
];

function IntroTable() {
  return (
    <div className="table-wrapper">
    <table className="my-table">
      <thead>
        <tr>
          <th>Urgency</th>
          <th>Issues</th>
          <th>Contact</th>
          <th>Who will follow-up</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item.Urgency}</td>
            <td>{item.Issues}</td>
            <td>{item.Contact}</td>
            <td>{item.Follow}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default IntroTable;