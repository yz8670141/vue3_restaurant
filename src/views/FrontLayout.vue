<template>
    <div class="container">
        <div class="row pt-3">
            <div class="col"></div>
            <div class="col-4">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
            </div>
            <div class="col-3 my-auto">
                <v-form id="form" ref="form" v-slot="{ errors }" @submit="submitOrder">
                    <h1 class="mb-4 text-center">VUE3餐廳</h1>

                    <!-- 會員名稱欄位 -->
                    <v-field type="text" placeholder="請輸入會員名稱"  name="會員名稱"  class="mb-3 px-3 pe-4 py-2" rules="required"
                        v-model="name" :class="{ 'is-invalid': errors['會員名稱'] }"></v-field>
                    <error-message name="會員名稱" class="invalid-feedback"></error-message>

                    <!-- 電子郵件欄位 -->
                    <v-field type="text" placeholder="請輸入電子郵件"  name="電子郵件"  autocomplete="current-password"  class="mb-3 px-3 pe-4 py-2" rules="required" 
                        v-model="email" :class="{ 'is-invalid': errors['電子郵件'] }"></v-field>
                    <error-message name="電子郵件" class="invalid-feedback"></error-message>

                    <!-- 密碼欄位 -->
                    <v-field type="password" placeholder="請輸入密碼" name="密碼"  autocomplete="current-password"  class="mb-4 px-3 pe-4 py-2" :rules="isPassword"
                        v-model="password" :class="{ 'is-invalid': errors['密碼'] }"></v-field>
                    <error-message name="密碼" class="invalid-feedback"></error-message>

                    <!-- 提交按鈕 -->
                    <button class="btn btn-lg btn-primary w-100" type="submit">
                        註冊
                    </button>
                </v-form>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
// 定義表單參考，方便調用表單內的方法 (例如 validate, resetForm)
const form = ref(null)

// 定義響應式的表單欄位變數
const name = ref('')
const email = ref('')
const password = ref('')


// 自訂驗證規則 - 密碼需含大小寫英文字母
function isPassword(value) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])/
    return passwordPattern.test(value) ? true : "密碼 需含大小寫英文字母"
}
function submitOrder() {
    // 使用 VeeValidate 提供的 validate 函式驗證表單
    form.value.validate().then((valid) => {
        if (valid) {
            // 驗證通過後，送出表單資料
            axios.post("http://localhost:3000/user", {
                name: name.value,
                email: email.value,
                password: password.value,
            })
                .then((res) => {
                    console.log(res)
                    alert("註冊成功")
                    // 請求成功後，重置表單
                    form.value.resetForm()
                })
                .catch((error) => {
                    console.error(error)
                    alert("註冊失敗")
                })
        } else {
            // 驗證失敗，提示使用者
            alert("請確實填寫資料後提交")
        }
    })
}
</script>

<style lang="sass" scoped>

</style>