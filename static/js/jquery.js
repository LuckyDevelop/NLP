$("#chat-submit1").click(function (e) {
    e.preventDefault();
    var msg = $("#chat-input1").val();
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
                    res_data_prediksi = res['data']
                    generate_message2(res_data_prediksi, 'bot');
                }
            });
        }
        catch (e) {
            console.log("Gagal !");
            console.log(e);
            msg = '<b>[Gagal]</b><br>' + msg;
            generate_message2(msg, 'bot');
        }
    }, 1000)
})
var INDEX1 = 0;
var INDEX2 = 0;

function generate_message1(msg, type) {
    INDEX1++;
    var str = "";
    str += "<div id='cm-msg1-" + INDEX1 + "' class=\"row chat-msg" + type + "\">";
    str += "<div class=\"cm-msg-text1 col-md\">";
    str += msg;
    str += "<\/div><\/div>";

    // Tampilkan pesan dengan animasi 
    $(".chat-logs1").append(str);
    $("#cm-msg1-" + INDEX1).hide().fadeIn(300);

    // Jika pesan dikirim dari HP 1, hapus text pada input text HP 1
    if (type == 'self') {
        $("#chat-input1").val('');
    }

    // Scroll ke pesan terakhir
    $(".chat-logs1").stop().animate(
        {
            scrollTop: $(".chat-logs1")[0].scrollHeight
        }, 1000);
}

// Fungsi untuk menampilkan SMS (chat) pada HP 2 (Anda)  
function generate_message2(msg, type) {

    // Tambah nilai index SMS HP 2 (Anda)
    INDEX2++;

    // Isi HTML untuk bagian SMS (chat-logs2) HP 2 (Anda)
    var str = "";
    str += "<div id='cm-msg2-" + INDEX2 + "' class=\"row chat-msg" + type + "\">";
    str += "<div class=\"cm-msg-text2\">";
    str += msg;
    str += "<\/div><\/div>";

    // Tampilkan pesan dengan animasi 
    $(".chat-logs1").append(str);
    $("#cm-msg2-" + INDEX2).hide().fadeIn(300);

    // Jika pesan dikirim dari HP 2, hapus text pada input text HP 2
    if (type == 'self') {
        $("#chat-input2").val('');
    }

    // Scroll ke pesan terakhir
    $(".chat-logs1").stop().animate({ scrollTop: $(".chat-logs2")[0].scrollHeight }, 1000);
}  