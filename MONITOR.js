// var socket = io.connect( 'http://localhost:4000' );
var socket = io.connect( 'http://167.99.168.1:4000' );

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
var ticks = document.querySelector('.js-ticks')



socket.on( 'join', function( event ) {
  connections.innerHTML = event.numConnections;
});

var displayOffset = false;
var displayTicks = false;
var displayTime = false;

socket.on( 'sync', function( event ) {
  
  
  
  if(!displayOffset) {
    
    displayOffset = setTimeout(()=>{
      var offsetMs = ntp.offset(); // time offset from the server in ms 
      offset.innerHTML = parseInt(offsetMs*10)/10;
      displayOffset=false
    },250)

    displayTicks = setTimeout(()=>{
      var ticksCount = event.ticks; // time offset from the server in ms 
      ticks.innerHTML = parseInt(ticksCount*10)/10;
      displayTicks=false
    },20)
    
    displayTime = setTimeout(()=>{
      var timeMs = event.ticks; // time offset from the server in ms 
      
      time.innerHTML = (parseInt(timeMs/100)/10)*2;
      displayTime=false
    },150)

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
