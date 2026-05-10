import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  // Inline dropdown options
  const filenames: vscode.QuickPickItem[] = [
    { label: "template.xlsx", description: "Template file" }
  ];

  const columns: vscode.QuickPickItem[] = [
    { label: "Name, Age, City", description: "Basic personal info" },
    { label: "Product, Quantity, Price", description: "Sales data" }
  ];

  const familyOf4: vscode.QuickPickItem[] = [
    { label: "Subscriber+Spouse+Teen+child, 5, HMO", description: "Family of 4 sample row 1" },
    { label: "Subscriber+Spouse+Teen+child, 5, Medicare", description: "Family of 4 sample row 2" },
    { label: "Subscriber+Spouse+Teen+child, 2, HMO", description: "Family of 4 sample row 3" },
    { label: "Subscriber+Spouse+Teen+child, 2, Medicare", description: "Family of 4 sample row 4" }


  ];

  const familyOf2: vscode.QuickPickItem[] = [
    { label: "Subscriber+Spose, 5, Medicare", description: "Family of 2 sample row1" },
    { label: "Subscriber+Spose, 5, Medicare", description: "Family of 2 sample row2" }

  ];

  const subscriberRows: vscode.QuickPickItem[] = [
    { label: "Subscriber, 5, Medicare", description: "Subscriber sample row1" },
    { label: "Subscriber, 5, Medicare", description: "Subscriber sample row2" }


    
  ];
const regions: vscode.QuickPickItem[] = [
    { label: "NCA", description: "North Central Area" },
    { label: "SCA", description: "South Central Area" }
  ];


  const ticketTitles: vscode.QuickPickItem[] = [
    { label: "Login Issue", description: "User cannot log in" },
    { label: "Password Reset", description: "Forgot password" }
  ];

  const ticketPriorities: vscode.QuickPickItem[] = [
    { label: "Low", description: "Minor issue" },
    { label: "Medium", description: "Needs attention soon" },
    { label: "High", description: "Critical issue" }
  ];

  // === Excel Command ===
  const createExcel = vscode.commands.registerCommand('mcp.createExcel', async () => {
    const filename = await vscode.window.showQuickPick(filenames, { placeHolder: "Select Excel filename" });
    const columnSet = await vscode.window.showQuickPick(columns, { placeHolder: "Select column set" });
    const data = await vscode.window.showQuickPick(
      [{ label: "", description: "No initial data" }, ...familyOf4],
      { placeHolder: "Select data row (optional)" }
    );

    if (!filename || !columnSet) {
      vscode.window.showErrorMessage("Filename and Columns are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/createExcel", {
        filename: filename.label,
        columns: columnSet.label.split(",").map((c: string) => c.trim()),
        data: data?.label ? data.label.split(",").map((d: string) => d.trim()) : []
      });
      vscode.window.showInformationMessage(`Excel file created: ${response.data.filename}`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to create Excel file: ${err.message}`);
    }
  });

  // === Family of 4 Command ===
  const addFamilyOf4 = vscode.commands.registerCommand('mcp.addFamilyOf4', async () => {
    const filename = await vscode.window.showQuickPick(filenames, { placeHolder: "Select target Excel filename" });
 const region = await vscode.window.showQuickPick(regions, { placeHolder: "Select Region" });
    const familyRow = await vscode.window.showQuickPick(familyOf4, { placeHolder: "Select Family of 4 row" });

    if (!filename || !familyRow || !region) {
      vscode.window.showErrorMessage("Filename and family and region row are required.");
      return;
    }
 
  
    try {
      const response = await axios.post("http://localhost:5000/addFamilyOf4", {
        filename: filename.label,
	  region: region.label,   // ✅ must be here
        row: familyRow.label.split(",").map((d: string) => d.trim())
      });
      vscode.window.showInformationMessage(`Family of 4 added to ${response.data.filename}`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to add family of 4: ${err.message}`);
    }
  });

  // === Family of 2 Command ===
  const addFamilyOf2 = vscode.commands.registerCommand('mcp.addFamilyOf2', async () => {
    const filename = await vscode.window.showQuickPick(filenames, { placeHolder: "Select target Excel filename" });
    const familyRow = await vscode.window.showQuickPick(familyOf2, { placeHolder: "Select Family of 2 row" });

    if (!filename || !familyRow) {
      vscode.window.showErrorMessage("Filename and family row are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addFamilyOf2", {
        filename: filename.label,
        row: familyRow.label.split(",").map((d: string) => d.trim())
      });
      vscode.window.showInformationMessage(`Family of 2 added to ${response.data.filename}`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to add family of 2: ${err.message}`);
    }
  });

  // === Subscriber Command ===
  const addSubscriber = vscode.commands.registerCommand('mcp.addSubscriber', async () => {
    const filename = await vscode.window.showQuickPick(filenames, { placeHolder: "Select target Excel filename" });
    const subscriberRow = await vscode.window.showQuickPick(subscriberRows, { placeHolder: "Select Subscriber row" });

    if (!filename || !subscriberRow) {
      vscode.window.showErrorMessage("Filename and subscriber row are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addSubscriber", {
        filename: filename.label,
        row: subscriberRow.label.split(",").map((d: string) => d.trim())
      });
      vscode.window.showInformationMessage(`Subscriber added to ${response.data.filename}`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to add subscriber: ${err.message}`);
    }
  });

  // === ServiceNow Ticket Command ===
  const createTicket = vscode.commands.registerCommand('mcp.createTicket', async () => {
    const title = await vscode.window.showQuickPick(ticketTitles, { placeHolder: "Select ticket title" });
    const priority = await vscode.window.showQuickPick(ticketPriorities, { placeHolder: "Select priority" });

    if (!title || !priority) {
      vscode.window.showErrorMessage("Ticket creation cancelled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/ticket", {
        title: title.label,
        priority: priority.label
      });
      vscode.window.showInformationMessage(`Ticket created: ${response.data.ticket.title} (${response.data.ticket.priority})`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to create ServiceNow ticket: ${err.message}`);
    }
  });

  // Register all commands
  context.subscriptions.push(
    createExcel,
    addFamilyOf4,
    addFamilyOf2,
    addSubscriber,
    createTicket
  );
}