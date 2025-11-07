import Message from '../models/Message.js';

export function registerChatHandlers(io, socket) {
  socket.on('joinTeamRoom', (teamId) => {
    socket.join(`team:${teamId}`);
  });

  socket.on('leaveTeamRoom', (teamId) => {
    socket.leave(`team:${teamId}`);
  });

  socket.on('sendMessage', async (payload) => {
    const { teamId, senderId, content } = payload || {};
    if (!teamId || !senderId || !content) return;
    const message = await Message.create({ team: teamId, sender: senderId, content });
    const hydrated = await message.populate('sender', 'name avatarUrl');
    io.to(`team:${teamId}`).emit('newMessage', hydrated);
  });
}








