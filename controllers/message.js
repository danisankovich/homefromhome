var User = require('../models/user');
var Message = require('../models/message');

exports.newMessage = (req, res) => {
  var first = 'John';
  var second = 'ty';
  Message.findOne(
    {userIds: { $all: [first, second]}},
    function(err, message) {
      if (err) res.send(err)
      if (!message) {
        const newMessageChain = new Message({
          userIds: [first, second],
          messages: [{
            senderId: first,
            dateSent: Date.now(),
            message: 'Let\'s go now man'
          }]
        })
        newMessageChain.save()
        res.send(newMessageChain);
      }
      else if (message) {
        const newMessage = {
          senderId: second,
          dateSent: Date.now(),
          message: 'Let\'s go now man and keep it on'
        }
        message.messages.push(newMessage)
        message.lastMessage = Date.now()
        message.save()
        res.send(message)
      }
    }
  );
}
