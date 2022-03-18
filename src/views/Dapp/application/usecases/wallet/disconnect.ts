import { disconnect } from "../../infrastructure/connectors";

export const disconnectWallet = (): Promise<void> | void => {
  disconnect();
  localStorage.removeItem("wallet");
}
