$(document).ready(function () {
    generate_message2('Halo! Saya Mia, pelayan AI restoran ini. Mia siap melayani pesanan makanan, minuman, dan sidedish di sini.<br>Apabila Anda ingin melihat menu, silakan pilih mau list menu apa yang ingin Mia berikan terlebih dahulu.<br>Berikut beberapa pilihan : <br>- List Menu Makanan <br>- List Menu Minuman <br>- List Menu Sidedish <br>Silakan pilih salah satu pilihan di atas, dan Mia akan memberikan daftar menu yang sesuai. Jika Anda memiliki pertanyaan atau butuh bantuan, jangan ragu untuk mengajukannya. Selamat memesan!', 'bot');
});

function handleChatSubmit(message) {
  var msg = message;
  if (msg.trim() == '') {
    return false;
  }
  generate_message1(msg, 'self');
  setTimeout(function () {
    try {
      $.ajax({
        url: "/api/deteksi",
        type: "POST",
        data: { "data": msg },
        success: function (res) {
          console.log(res);          
          if (res['type'] == 'makanan') {
            generate_menu(res['data'], getListMenu(res['type']), 'bot');
          } else if (res['type'] == 'minuman') {
            generate_menu(res['data'], getListMenu(res['type']), 'bot');
          } else if (res['type'] == 'sidedish') {
            generate_menu(res['data'], getListMenu(res['type']), 'bot');
          } else {
            generate_message2(res.data, 'bot');    
          }
        }
      });
    }
    catch (e) {
      console.log("Gagal !");
      console.log(e);
      msg = '<b>[Gagal]</b><br>' + msg;
      generate_message2(msg, 'bot');
    }
  }, 1000);
}