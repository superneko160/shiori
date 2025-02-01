import type { Status, StatusConfig } from "./../types"

export const STATUS_CONFIG: Record<Status, StatusConfig> = {
  CONSIDERING_PURCHASE: {
    label: "購入検討中",
    variant: "considering_purchase",
  },
  PURCHASED_UNREAD: { label: "積読中", variant: "purchaced_unread" },
  READING: { label: "読書中", variant: "reading" },
  COMPLETED: { label: "読了", variant: "completed" },
}
