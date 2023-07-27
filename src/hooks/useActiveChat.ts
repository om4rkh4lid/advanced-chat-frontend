import { useContext } from "react"
import { ActiveChatContext } from "../contexts/ActiveChatContext"

export const useActiveChat = () => {
  return useContext(ActiveChatContext)
}