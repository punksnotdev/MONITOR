var socket = io.connect( 'http://localhost:4000' );

socket.emit( 'join', {
  foo: 'foo'
});


ntp.init(socket);  





// var ack = document.querySelector( '.js-ack' );
// ack.addEventListener( 'click', function( event ) {
//   socket.emit( 'ack', {
//     foo: 'foo'
//   }, res => {
//     console.log( 'acknowledgement:', res )
//   });
// });
var connections = document.querySelector( '.js-connect' );
var offset = document.querySelector( '.js-offset' );
var time = document.querySelector('.js-time')



socket.on( 'join', function( event ) {
  connections.innerHTML = event.numConnections;
});

var displayOffset = false;

socket.on( 'sync', function( event ) {
  
  
  time.innerHTML = event.time;
  
  if(!displayOffset) {
    
    displayOffset = setTimeout(()=>{
      var offsetMs = ntp.offset(); // time offset from the server in ms 
      offset.innerHTML = parseInt(offsetMs*10)/10;
      displayOffset=false
    },100)

  }
  
});
socket.on( 'connections', function( event ) {
  connections.innerHTML = event.numConnections;
});
// socket.on( 'msg', function( event ) {
//   console.log( 'msg', event );
// });
// socket.on( 'response', function( event ) {
//   console.log( 'response:', event.message );
// });
// var chat = io.connect( 'http://localhost:4000/chat' );
// chat.on( 'message', function( event ) {
//   console.log( 'chat message:', event );
// });
// var chatBtn = document.querySelector( '.js-chatBtn' );
// chatBtn.addEventListener( 'click', function( event ) {
//   chat.emit( 'message', 'Yo central, are you on the line?' );
// });