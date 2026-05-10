import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  // === Excel Command ===
  const createExcel = vscode.commands.registerCommand('mcp.createExcel', async () => {
    const filename = await vscode.window.showInputBox({ prompt: "Filename — e.g. data.xlsx", value: "data.xlsx" });
    const columns = await vscode.window.showInputBox({ prompt: "Columns — e.g. Name, Age, City", value: "Name, Age, City" });
    const data = await vscode.window.showInputBox({ prompt: "Data — optional (comma separated)", value: "" });

    if (!filename || !columns) {
      vscode.window.showErrorMessage("Filename and Columns are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/createExcel", {
        filename,
        columns: columns.split(",").map(c => c.trim()),
        data: data ? data.split(",").map(d => d.trim()) : []
      });
      vscode.window.showInformationMessage(`Excel file created: ${response.data.filename}`);
    } catch (err) {
      vscode.window.showErrorMessage("Failed to create Excel file.");
    }
  });

  // === Family of 4 Command (single row) ===
  const addFamilyOf4 = vscode.commands.registerCommand('mcp.addFamilyOf4', async () => {
    const filename = await vscode.window.showInputBox({ prompt: "Target Excel filename", value: "template.xlsx" });
    const familyRow = await vscode.window.showInputBox({
      prompt: "Family of 4 — e.g. Subscriber+Spouse+Teen+child",
      value: "1,Subscriber+sp+teen+child,5,Medicare,5,6001"
    });

    if (!filename || !familyRow) {
      vscode.window.showErrorMessage("Filename and family row are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addFamilyOf4", {
        filename,
        row: familyRow.split(",").map(d => d.trim())
      });
      vscode.window.showInformationMessage(`Family of 4 added to ${response.data.filename}`);
    } catch (err) {
      vscode.window.showErrorMessage("Failed to add family of 4.");
    }
  });

  // === Family of 2 Command (single row) ===
  const addFamilyOf2 = vscode.commands.registerCommand('mcp.addFamilyOf2', async () => {
    const filename = await vscode.window.showInputBox({ prompt: "Target Excel filename", value: "template.xlsx" });
    const familyRow = await vscode.window.showInputBox({
      prompt: "Family of 2 — e.g. Subscriber+Spouse",
      value: "1,Subscriber+sp,5,Medicare,5,6001"

    });

    if (!filename || !familyRow) {
      vscode.window.showErrorMessage("Filename and family row are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addFamilyOf2", {
        filename,
        row: familyRow.split(",").map(d => d.trim())
      });
      vscode.window.showInformationMessage(`Family of 2 added to ${response.data.filename}`);
    } catch (err) {
      vscode.window.showErrorMessage("Failed to add family of 2.");
    }
  });

  // === Subscriber Command ===
  const addSubscriber = vscode.commands.registerCommand('mcp.addSubscriber', async () => {
    const filename = await vscode.window.showInputBox({ prompt: "Target Excel filename", value: "template.xlsx" });
    const subscriberRow = await vscode.window.showInputBox({
      prompt: "Family of 1 — e.g. Subscriber",
      value: "1,Subscriber,5,Medicare,5,6001"

    });

    if (!filename || !subscriberRow) {
      vscode.window.showErrorMessage("Filename and subscriber row are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addSubscriber", {
        filename,
        row: subscriberRow.split(",").map(d => d.trim())
      });
      vscode.window.showInformationMessage(`Subscriber added to ${response.data.filename}`);
    } catch (err) {
      vscode.window.showErrorMessage("Failed to add subscriber.");
    }
  });

  // === ServiceNow Ticket Command ===
  const createTicket = vscode.commands.registerCommand('mcp.createTicket', async () => {
    const title = await vscode.window.showInputBox({ prompt: "Enter ticket title", value: "Login issue" });
    const priority = await vscode.window.showQuickPick(["Low", "Medium", "High"], { placeHolder: "Select priority" });

    if (!title || !priority) {
      vscode.window.showErrorMessage("Ticket creation cancelled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/ticket", {
        title,
        priority
      });
      vscode.window.showInformationMessage(`Ticket created: ${response.data.ticket.title} (${response.data.ticket.priority})`);
    } catch (err) {
      vscode.window.showErrorMessage("Failed to create ServiceNow ticket.");
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

export function deactivate() {}
