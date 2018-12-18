$(function () {
    var myhp = 4;       //自分のHP
    var pchp = 4;       //コンピューターのHP
    var myhp_g;         //自分のHPゲージ
    var pchp_g;         //コンピューターのHPゲージ
    var mylose = 0;     //自分の負けフラグ
    var pclose = 0;     //コンピューターの負けフラグ
    var myhand;         //自分の手
    var pchand;         //コンピューターの手
    var gyanken = ["グー", "チョキ", "パー"];
    // var atti_arr = ["うえ", "した", "みぎ", "ひだり"];
    // var attiWinFlg;
    var jankenResult;   //じゃんけんの結果 0:勝ち 1:負け 2:あいこ
    let num = 1;
    let kusogeFlg = 0;
    let time;

    //ダメージ処理
    function damageHp(hp) {
        hp--;
        return hp;
    };

    //じゃんけん終わり判定
    function finChk(hp) {
        if (hp > 0) {
            return 0;
        } else {
            return 1;
        }
    };

    //コンピューターの手をランダムで入れる処理
    function randHand() {
        const num = Math.floor(Math.random() * 3);
        let pc = "";
        pc = gyanken[num];
        return pc;
    };

    //コンピュータの手を表示する処理
    function dispPcHand(pchand) {
        $('#pc_hand').removeClass();
        $('#pc_hand').text("コンピュータの出した手:" + pchand);
        if (pchand == "グー") {
            $('#pc_hand').addClass('pchand_gu');
        } else if (pchand == "チョキ") {
            $('#pc_hand').addClass('pchand_cho');
        } else if (pchand == "パー") {
            $('#pc_hand').addClass('pchand_pa');
        }
    };

    //リセット処理(呼ばれるやつ)
    function resetDisp(kusogeFlg) {
        $('#pc_hand').text("コンピュータの出した手は？");
        $('#judgment').text("結果は？");
        $('#judgment').css('color', 'black');
        $('#pchp_g').val(1);
        $('#myhp_g').val(1);
        if (kusogeFlg == 0) {
            $('#my_img').removeClass();
            $('#my_img').addClass('my_img');
            $('#pc_img').removeClass();
            $('#pc_img').addClass('pc_img');
        } else if (kusogeFlg == 1) {
            $('#my_img').removeClass();
            $('#my_img').addClass('my_img_kusogemode');
            $('#pc_img').removeClass();
            $('#pc_img').addClass('pc_img_kannnon');
            // $('#pc_hand').html('<div class="pc_hand"></div>');
            $('body').css('background-color', 'gold');
            $('h1').css('background-color', 'gold');
        };
    };

    //じゃんけんの勝ち負け判定処理
    function judgeJanken(myhand, pchand, kusogeFlg) {
        if (kusogeFlg == 0) {
            if (myhand == "グー") {
                if (pchand == "グー") {
                    return 2; //あいこ
                } else if (pchand == "チョキ") {
                    return 0; //勝ち
                } else if (pchand == "パー") {
                    return 1; //負け
                }
            } else if (myhand == "チョキ") {
                if (pchand == "グー") {
                    return 1; //負け
                } else if (pchand == "チョキ") {
                    return 2; //あいこ
                } else if (pchand == "パー") {
                    return 0; //勝ち
                }
            } else if (myhand == "パー") {
                if (pchand == "グー") {
                    return 0; //勝ち
                } else if (pchand == "チョキ") {
                    return 1; //負け
                } else if (pchand == "パー") {
                    return 2; //あいこ
                }
            };
        } else if (kusogeFlg == 1) {
            return 1;//絶対に負け
        };
    };

    function dispRandHand() {
        function randHand(num) {
            var hoge = num;
            if (hoge == 1) {
                $('#pc_hand').addClass('pchand_gu');
                $('#pc_hand').removeClass('pchand_cho');
                $('#pc_hand').removeClass('pchand_pa');
            } else if (hoge == 2) {
                $('#pc_hand').addClass('pchand_cho');
                $('#pc_hand').removeClass('pchand_gu');
                $('#pc_hand').removeClass('pchand_pa');
            } else if (hoge == 3) {
                $('#pc_hand').addClass('pchand_pa');
                $('#pc_hand').removeClass('pchand_cho');
                $('#pc_hand').removeClass('pchand_gu');
            }
        };

        if (kusogeFlg == 1) {
            time = 50;
        } else if (kusogeFlg == 0) {
            time = 200;
        };
        console.log("time:" + time);
        timer = setInterval(() => {
            randHand(num);
            if (num == 3) {
                num = 1;
            } else {
                num++;
            }
        }, time);
    };

    function dispResult(mylose, pclose) {
        if (mylose == 1) {
            $('#judgment').text("あなたの負けです…");
            $('#judgment').css('color', 'blue');
        } else if (pclose == 1) {
            $('#judgment').text("あなたの勝ちです！！！");
            $('#judgment').css('color', 'red');
        } else {
            //なにもしない
        }
    };

    function dispWinImg(mylose, pclose, kusogeFlg) {
        console.log(mylose, pclose, kusogeFlg);
        if (mylose == 1 && kusogeFlg == 0) {
            $('#my_img').removeClass();
            $('#my_img').addClass('my_img_lose');
            $('#pc_img').removeClass();
            $('#pc_img').addClass('pc_img_win');
        } else if (pclose == 1 && kusogeFlg == 0) {
            $('#my_img').removeClass();
            $('#my_img').addClass('my_img_win');
            $('#pc_img').removeClass();
            $('#pc_img').addClass('pc_img_lose');
        } else if (mylose == 1 && kusogeFlg == 1) {
            $('#my_img').removeClass();
            $('#my_img').addClass('my_img_lose');
        } else {
            //なにもしない
        }
    };
    //PCの手をランダム表示する処理を実行する
    dispRandHand();
    // $("more").hide();


    // じゃんけんボタン
    $('#gu_btn, #cho_btn, #par_btn').on('click', function () {
        if (mylose == 0 && pclose == 0) {
            myhand = $(this).text();
            console.log(myhand);
            pchand = randHand();
            dispPcHand(pchand);
            jankenResult = judgeJanken(myhand, pchand, kusogeFlg);
            if (kusogeFlg == 0) {
                clearInterval(timer);
            } else if (kusogeFlg == 1) {
                //clearInterval(timer);
            };
            //勝ち
            if (jankenResult == 0) {
                pchp = damageHp(pchp);
                pchp_g = $('#pchp_g').val();
                pchp_g = pchp_g - 0.25;
                $('#pchp_g').val(pchp_g);
                $('#judgment').text("勝ち");
                $('#judgment').css('color', 'red');
                attiWinFlg = 0;
            }
            //負け
            else if (jankenResult == 1) {
                myhp = damageHp(myhp);
                myhp_g = $('#myhp_g').val();
                myhp_g = myhp_g - 0.25;
                $('#myhp_g').val(myhp_g);
                $('#judgment').text("負け");
                $('#judgment').css('color', 'blue');
                attiWinFlg = 1;
            }
            //あいこ
            else if (jankenResult == 2) {
                $('#judgment').text("あいこ");
                $('#judgment').css('color', 'black');
            }
            mylose = finChk(myhp);
            pclose = finChk(pchp);
            dispResult(mylose, pclose);
            dispWinImg(mylose, pclose, kusogeFlg);
            console.log(mylose, pclose);
            console.log("time:" + time);
        } else {
            console.log("wakaran");
        };
    });

    //リセットボタン
    $('#more').on('click', function () {
        if (mylose == 0 && pclose == 0) {
            //どちらかのHPが0でないときは
            //なにもしない
        } else {
            if (mylose == 1) {
                mylose = 0;
                pclose = 0;
                myhp = 4;
                pchp = 4;
                dispRandHand();
                resetDisp(kusogeFlg);
                console.log(mylose, pclose);
            } else if (pclose == 1) {
                kusogeFlg = 1;
                mylose = 0;
                pclose = 0;
                myhp = 4;
                pchp = 4;
                dispRandHand();
                resetDisp(kusogeFlg);
                console.log(mylose, pclose);
            };
        };
    });
});







