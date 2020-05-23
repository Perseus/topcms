<template>
  <div class="fetched-account-details">
    <b-modal :active="shouldShowUpdateUserEmailModal" @close="toggleModal" has-modal-card>
      <update-user-email-modal v-if="shouldShowUpdateUserEmailModal" @handleUpdateEmail="handleUpdateUserEmail"></update-user-email-modal>
    </b-modal>

    <b-modal :active="shouldShowUpdatePasswordModal" @close="toggleModal" has-modal-card>
      <update-user-password-modal v-if="shouldShowUpdatePasswordModal" @handleUpdatePassword="handleUpdateUserPassword"></update-user-password-modal>
    </b-modal>

    <b-modal :active="shouldShowUpdateGMModal" @close="toggleModal" has-modal-card>
      <update-user-gm-level-modal
      v-if="shouldShowUpdateGMModal"
        :currentLevel="accountData.account_details.gm"
        @handleUpdateGMLevel="handleUpdateUserGMLevel"
      ></update-user-gm-level-modal>
    </b-modal>

    <b-modal :active="shouldShowUpdatePointsModal" @close="toggleModal">
      <update-user-mall-points
        v-if="shouldShowUpdatePointsModal"
        :modalOptions="modalState.options"
        @updatePoints="handleUpdatePoints"
      />
    </b-modal>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Account Details</p>
      </header>
      <div class="card-content account-details">
        <div class="detail-row">
          <div class="detail-title is-size-6">Username:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">{{ accountData.name }}</div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6">Email:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">
            {{ accountData.email }}
            <a
              @click.prevent="openEmailUpdateModal"
              class="is-size-7 edit-text has-text-weight-normal has-text-link"
            >[Edit]</a>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6">Password:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">
            ************
            <a
              @click.prevent="openPasswordUpdateModal"
              class="is-size-7 edit-text has-text-weight-normal has-text-link"
            >[Edit]</a>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6"> Mall Points: </div>
          <div class="detail-value is-size-6 has-text-weight-bold">
            {{ accountData.mallPoints }}
            
            <a
              @click.prevent="openPointsUpdateModal('MALL')"
              class="is-size-7 edit-text has-text-weight-normal has-text-link"
              >[Edit]</a>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6"> Award Center Points: </div>
          <div class="detail-value is-size-6 has-text-weight-bold">
            {{ accountData.awardCenterPoints }}
            
            <a
              @click.prevent="openPointsUpdateModal('CREDIT')"
              class="is-size-7 edit-text has-text-weight-normal has-text-link"
              >[Edit]</a>
          </div>
        </div>
        

        <b-button @click="handleResetUserSecurityCode">Reset Security Code</b-button>

        <hr />

        <div class="detail-row">
          <div class="detail-title is-size-6">Last Login IP:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">{{ accountData.last_login_ip }}</div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6">Last Login MAC:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">{{ accountData.last_login_mac }}</div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6">Ban Status:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">
            <b-switch
              :value="getBanStatus( accountData.ban ) "
              type="is-danger"
              @input="handleBanForUser( accountData.id,accountData.ban )"
            ></b-switch>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-title is-size-6">GM Level:</div>
          <div class="detail-value is-size-6 has-text-weight-bold">
            {{ accountData.account_details.gm }}
            <a
              @click.prevent="openGMLevelUpdateModal"
              class="is-size-7 edit-text has-text-weight-normal has-text-link"
            >[Edit]</a>
          </div>
        </div>

        <hr />

        <div class="character-section-wrapper">
          <div class="is-size-4">Characters</div>
          <div class="character-section">
            <div
              v-for="character in getValidCharacters( accountData.character_details )"
              :key="character.cha_id"
              class="character-item"
              @click="redirectToCharacter(character.cha_id)"
            >
              <img class="character-icon" :src="getCharacterIcon( character )" />
              <div class="character-name has-text-weight-bold is-size-6">{{ character.cha_name }}</div>
              <div class="character-job has-text-weight-normal is-size-7">{{ character.job }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Account.js"></script>
<style src="./Account.scss" lang="scss" scoped></style>