<template>
  <div class="index">
    <div class="index__panels">
      <InformationPanel>
        <template slot="heading">
          Server Information
        </template>
        <template slot="body">
          
          <div class="information-item">
            <span class="information-item__heading">Solo EXP</span>
            <span class="information-item__value">1000x</span>
          </div>
          <div class="information-item">
            <span class="information-item__heading">Party EXP</span>
            <span class="information-item__value">1000x</span>
          </div>
          <div class="information-item">
            <span class="information-item__heading">Drop Rate</span>
            <span class="information-item__value">1000x</span>
          </div>
          <div class="information-item">
            <span class="information-item__heading">Pet EXP</span>
            <span class="information-item__value">1000x</span>
          </div>

        </template>
      </InformationPanel>
      <InformationPanel>
        <template slot="heading">
          Server Statistics
        </template>
        <template slot="body">

          <div class="information-item">
            <span class="information-item__heading">Online Players</span>
            <span class="information-item__value">300/500</span>
          </div>
          <div class="information-item">
            <span class="information-item__heading">Server Status</span>
            <span class="information-item__value">
               <span class="server-status-online"> Online </span> 
            </span>
          </div>
          
        </template>
      </InformationPanel>
    </div>

    <div class="index__body">
      
      <div class="news-container">

        <div class="news-item">

          <div class="news-item__body">
            <span class="news-item__heading"> <div class="news-item__heading-announcement"> Announcement </div> News Heading </span>
            <p class="news-item__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto cumque debitis at fugit ipsam officia nihil obcaecati, voluptates voluptas quasi quibusdam numquam amet quae accusamus veniam! Eligendi sapiente ex nostrum?
            </p>
            <span class="news-item__footer">
              <router-link to="/" class="news-item__footer-item"> Read More </router-link>
            </span>
          </div>

        </div>

        <div class="news-item">

          <div class="news-item__body">
            <span class="news-item__heading"> <div class="news-item__heading-announcement"> Announcement </div> News Heading </span>
            <p class="news-item__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto cumque debitis at fugit ipsam officia nihil obcaecati, voluptates voluptas quasi quibusdam numquam amet quae accusamus veniam! Eligendi sapiente ex nostrum?
            </p>
            <span class="news-item__footer">
              <router-link to="/" class="news-item__footer-item"> Read More </router-link>
            </span>
          </div>

        </div>

        <div class="news-item">

          <div class="news-item__body">
            <span class="news-item__heading"> <div class="news-item__heading-announcement"> Announcement </div> News Heading </span>
            <p class="news-item__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto cumque debitis at fugit ipsam officia nihil obcaecati, voluptates voluptas quasi quibusdam numquam amet quae accusamus veniam! Eligendi sapiente ex nostrum?
            </p>
            <span class="news-item__footer">
              <router-link to="/" class="news-item__footer-item"> Read More </router-link>
            </span>
          </div>

        </div>

        <div class="news-item">

          <div class="news-item__body">
            <span class="news-item__heading"> <div class="news-item__heading-announcement"> Announcement </div> News Heading </span>
            <p class="news-item__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto cumque debitis at fugit ipsam officia nihil obcaecati, voluptates voluptas quasi quibusdam numquam amet quae accusamus veniam! Eligendi sapiente ex nostrum?
            </p>
            <span class="news-item__footer">
              <router-link to="/" class="news-item__footer-item"> Read More </router-link>
            </span>
          </div>

        </div>
        
      </div>

    </div>

    
  </div>

</template>

<script src="./Index.js"></script>

<style src="./Index.scss" lang="scss"></style>