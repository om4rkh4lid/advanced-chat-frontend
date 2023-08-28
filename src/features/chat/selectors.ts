import { useAppSelector } from "../../hooks/useAppSelector";

export const getLastActiveChatUser = () => useAppSelector(state => state.chat.lastActiveChat);

export const getActiveChatMessages = () => useAppSelector(state => state.chat.messages.filter(msg => msg.from === state.chat.lastActiveChat || msg.to === state.chat.lastActiveChat));
// const activeChatMessagesSelector = createSelector(
//   (state: RootState) => state.chat.messages, 
//   (state: RootState) => state.chat.lastActiveChat,
//   (messages, lastActiveChat) => messages.filter((msg => msg.from === lastActiveChat || msg.to === lastActiveChat))
// );
// export const getActiveChatMessages = () => activeChatMessagesSelector(getAppState())

export const getOnlineUsers = () => useAppSelector(state => state.chat.onlineUsers.filter(user => state.auth.user && user !== state.auth.user?.id))
// const onlineUsersSelector = createSelector(
//   (state: RootState) => state.chat, 
//   (state: RootState) => state.auth.user,
//   (chat, authenticatedUser) => chat.onlineUsers.filter(user => user !== authenticatedUser?.id)
// );
// export const getOnlineUsers = () => {
//   // console.log('state', getAppState())
//   return onlineUsersSelector(getAppState())
// }