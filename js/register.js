window.onload = function() {
    var regtel = /^1[3|4|5|7|8][0-9]{9}$/;
    var regpsd = /^([\w-]){6,16}$/;
    var tel = document.querySelector("#tel");
    var passw = document.querySelector("#passw");
    var verify = document.querySelector("#verify");

    function regtest(ele, reg) {
        ele.addEventListener("blur", function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.innerHTML = '<i class="sucess_icon"></i> 格式正确'
            } else {
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请重新输入！'
            }

        })
    }
    regtest(tel, regtel);
    regtest(passw, regpsd);
    verify.addEventListener("blur", function() {
        if (this.value == passw.value) {
            this.nextElementSibling.innerHTML = '<i class="sucess_icon"></i> 密码一致'
        } else {
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码不一致，请重新输入！'
        }
    })
};