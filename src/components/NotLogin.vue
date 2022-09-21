<template>
  <div>
    <div class="header">
      <div class="header-operation">
        <div class="header-operation-min">-</div>
        <div class="header-operation-max">□</div>
        <div class="header-operation-close">×</div>
      </div>
    </div>

    <div class="aside">
      <div class="aside-user">
        <div class="aside-user-profilepicture"></div>
        <div class="aside-user-desc">
          <div class="aside-user-desc-name">伤心太平洋</div>
          <div class="aside-user-desc-signature">
            我只爱你 You are my only 我只爱你 You are my only 我只爱你 You are
            my only 我只爱你 You are my only 我只爱你 You are my only 我只爱你 You are
              my only 我只爱你 You are my only 我只爱你 You are my only 我只爱你 You are
              my only
          </div>
        </div>
      </div>

      <div class="aside-search">
        <input type="text" class="aside-search-input" />
        <div class="aside-search-button">搜索</div>
      </div>

      <div class="aside-talkblock"></div>
      <div class="aside-talkblockbottom">
        <div class="aside-talkblockbottom-operation">
          <div class="aside-talkblockbottom-operation-cloud">词云</div>
          <div class="aside-talkblockbottom-operation-add">+</div>
        </div>
      </div>
    </div>

    <div class="maintalk">
      <div class="maintalk-header">
        <div class="maintalk-header-desc">


          <div class="aside-user-profilepicture" style="left:60px"></div>
          <div class="aside-user-desc" style="left:180px">
            <div class="aside-user-desc-name">伤心太平洋</div>
            <div class="aside-user-desc-signature">
              我只爱你 You are my only 我只爱你 You are my only 我只爱你 You are
              my only 我只爱你 You are my only 我只爱你 You are my only 我只爱你 You are
              my only 我只爱你 You are my only 我只爱你 You are my only 我只爱你 You are
              my only
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-size: 20px;
}
.header {
  width: 100%;
  height: 50px;
}
.header-operation {
  height: 100%;
  width: 210px;
  float: right;
  margin-right: 20px;
}
.header-operation div {
  height: 100%;
  width: 33%;
  display: inline-block;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.header-operation-min {
  background-color: #fcffca;
}
.header-operation-max {
  background-color: #cafeff;
}
.header-operation-close {
  background-color: #fecccb;
}

.aside {
  display: inline-block;
  width: 40%;
  height: 1000px;
  margin-left: 40px;

  vertical-align: top;
}
.aside-user {
  height: 100px;
  position: relative;
}

.aside-user-profilepicture {
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border: 1px solid black;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.aside-user-desc {
  height: 80px;
  width: 70%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 140px;
}
.aside-user-desc-name {
  height: 40px;
  line-height: 40px;
}
.aside-user-desc-signature {
  height: 40px;
  line-height: 40px;
  font-size: 15px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.aside-search {
  height: 40px;
  margin-top: 30px;
}
.aside-search-input {
  outline: none;
  border: 1px solid black;
  vertical-align: top;

  width: 65%;
  height: 100%;
  display: inline-block;

  padding: 0 10px;
  box-sizing: border-box;
}
.aside-search-button {
  width: 35%;
  height: 100%;
  display: inline-block;
  text-align: center;

  line-height: 40px;

  border: 1px solid black;
  border-left: none;
  box-sizing: border-box;
  cursor: pointer;
}
.aside-search-button {
  width: 35%;
  height: 100%;
  display: inline-block;
  text-align: center;

  line-height: 40px;

  border: 1px solid black;
  border-left: none;
  box-sizing: border-box;
  cursor: pointer;
}
.aside-talkblock {
  height: 730px;
  margin-top: 30px;
  box-sizing: border-box;
  border: 1px solid black;
}
.aside-talkblockbottom {
  height: 40px;
  border: 1px solid black;
  border-top: none;
  box-sizing: border-box;
}
.aside-talkblockbottom-operation {
  float: right;
}
.aside-talkblockbottom-operation div {
  width: 100px;
  text-align: center;
  display: inline-block;
  line-height: 40px;
  border: 1px solid black;
  border-top: none;
  border-bottom: none;
  border-right: none;
  cursor: pointer;
}

.maintalk {
  margin-bottom: 30px;
  margin-right: 20px;
  margin-left: 20px;
  display: inline-block;
  height: 970px;
  width: 56.5%;

  border: 1px solid black;
  box-sizing: border-box;

  vertical-align: top;
}
.maintalk-header {
  height: 20%;
  width: 100%;
  border-bottom: 1px solid black;
}
.maintalk-header-desc {
  height: 100%;
  width: 70%;

  border-right: 1px solid black;

  position: relative;
}
</style>