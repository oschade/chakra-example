// import { createSelector } from 'reselect'
// import type { RootState } from '@redux/store'
// import { Message } from '@redux/chat/types'
// import { users } from '@data'
// import { now, uuid } from '@helper'
// import type { User } from '@/data/users/types'

// import moment from 'moment'

// // chat state
// export const selectAllChats = (state: RootState) => state.chat.chats

// export const selectAllMessages = (state: RootState) =>
//   state.chat.messages.allIds.map((id) => state.chat.messages.byId[id])

// export const selectReplyChoices = (state: RootState) =>
//   state.chat.replyChoices.allIds.map((id) => state.chat.replyChoices.byId[id])

// export const selectChatOverview = createSelector(
//   selectAllChats,
//   selectAllMessages,
//   selectReplyChoices,
//   (chats, messages, replyChoices) => {
//     console.warn('#################### you should see me once')

//     const allChats = chats.allIds.map((id) => chats.byId[id])
//     return allChats.map((chat) => {
//       const chatUsers = chat.users.map((id) => users[id])

//       const messagesOfChat = messages.filter((msg) => msg.chatId === chat.id)

//       const latestMessage = messagesOfChat[messagesOfChat.length - 1]

//       let title = chat.title
//       let img = chat.img

//       if (chat.type === 'single') {
//         const user = chatUsers[0]

//         title = `${user.name} ${user.lastname}`
//         img = user.avatar
//       } else {
//         title = ''
//       }

//       const isActive = replyChoices.length > 0 || !latestMessage.seen

//       return {
//         ...chat,
//         users: chatUsers,
//         latestMessage,
//         img,
//         title,
//         isActive,
//       }
//     })
//   }
// )

// const selectChatStateById = (state: RootState, chatId: string) =>
//   createSelector(selectAllChats, (allChats) => {
//     return allChats.byId[chatId]
//   })(state)

// const selectMessagesByChatId = (state: RootState, chatId: string) =>
//   createSelector(selectAllMessages, (allMessages) => {
//     return allMessages.filter((message) => message.chatId === chatId)
//   })(state)

// interface EnhancedMessage extends Message {
//   fromObj: User | null
//   isWritten?: boolean
// }

// interface MessagesGroupedBySender {
//   [key: number]: EnhancedMessage[]
// }

// const groupMessagesBySender = (messages: Message[]) => {
//   const messagesGroupBySenderObj: MessagesGroupedBySender = []

//   let lastFrom: undefined | string
//   let currentIndex = -1

//   messages.forEach((nextMessage) => {
//     const from = nextMessage.from

//     if (from !== lastFrom) {
//       lastFrom = from
//       currentIndex += 1
//       messagesGroupBySenderObj[currentIndex] = []
//     }

//     messagesGroupBySenderObj[currentIndex].push({
//       ...nextMessage,
//       fromObj: nextMessage.from !== 'me' ? users[nextMessage.from] : null,
//     })
//   })

//   return messagesGroupBySenderObj
// }

// const groupMessagesByDate = (messages) => {
//   const messagesGroupByDateObj = {}

//   messages.forEach((nextMessage) => {
//     const date = moment(nextMessage.timestamp).format('YYYY-MM-DD')

//     if (!messagesGroupByDateObj[date]) {
//       messagesGroupByDateObj[date] = []
//     }

//     messagesGroupByDateObj[date].push(nextMessage)
//   })

//   const allDates = Object.keys(messagesGroupByDateObj)

//   const messagesGroupByDate = allDates.map((date): {
//     date: string
//     data: MessagesGroupedBySender
//   } => {
//     return {
//       date,
//       data: groupMessagesBySender(messagesGroupByDateObj[date]),
//     }
//   })

//   return messagesGroupByDate
// }

// export const selectChatById = createSelector(
//   selectChatStateById,
//   selectMessagesByChatId,
//   selectReplyChoices,
//   (chat, messages, allReplyChoices) => {
//     const replyChoices = allReplyChoices
//       .filter((c) => c.chatId === chat.id)
//       .flatMap((c) => {
//         return c.answers.map((a, index) => {
//           return {
//             id: `${c.id}-${index}`,
//             replyChoiceId: c.id,
//             text: a,
//             sequenceId: c.sequenceId,
//           }
//         })
//       })

//     const groupedMessages = groupMessagesByDate(messages)

//     return {
//       ...chat,
//       replyChoices,
//       messages: groupedMessages,
//     }
//   }
// )
