<template>
  <div v-scroll-lock="mouseOverGame">
    <!--Game Start Button-->
    <button
      v-if="boolGameOff"
      style="margin-bottom: 8px;"
      @click="
        setGameOff(false), allPossibleMoves(), drawPiece(), drawNextPiece()
      "
    >
      Start
    </button>
    <div v-if="!boolGameOff" style="height: 38px;"></div>

    <!--Game-->
    <div
      style="width: 920px; heigth: 420px; margin: auto; position: relative; margin-top: 20px;"
    >
      <!--Score-->
      <div
        style="float: left; width: 220px; margin-right: 30px; margin-top: 37px;"
      >
        <b-card bg-variant="dark">
          <h4 style="color: #ffffff">Score: {{ score }}</h4>
        </b-card>
        <!--Instructions Button-->
        <button @click="$bvModal.show('inst-modal')" style="margin-top: 8px;">
          Instructions
        </button>
      </div>

      <!--Game Grid-->
      <div
        style="float: left;"
        class="main-grid"
        @mouseover="mouseOverGame = true"
        @mouseleave="mouseOverGame = false"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <!--Next Piece-->
      <div style="float: left; margin-left: 30px;">
        <h5 style="margin-top: 5px;">Next Piece:</h5>
        <div class="next-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <!--Instructions Modal-->
    <b-modal id="inst-modal" title="Instructions" hide-footer>
      <div class="modal-class">
        <h6>Goal</h6>
        <ul>
          <li>Fill rows and columns with blocks to clear them</li>
          <li>Get as high of a score as you can</li>
        </ul>
        <h6>Controls</h6>
        <ul>
          <li>
            Use left and right arrow keys to cycle through block placements
          </li>
          <li>
            Can also scroll to cycle through block placements when hovering the
            mouse over the game grid
          </li>
          <li>Press Enter to place block</li>
        </ul>
      </div>
    </b-modal>

    <!--Game Over Modal-->
    <b-modal
      id="end-modal"
      title="GAME OVER"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <div class="modal-class">
        <h4 style="margin-bottom: 16px;">Final Score: {{ score }}</h4>
        <input
          style="margin-bottom: 16px;"
          type="text"
          v-model="currentScore.name"
        />
        <button :disabled="checkNameFill()" @click.prevent="resetGame()">
          Submit
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
document.body.style.backgroundColor = '#777999'

import { mapState, mapActions } from 'vuex'
import store from '../store.js'

export default {
  beforeRouteLeave(routeTo, routeFrom, next) {
    store.dispatch('changeBoolGameOff', {
      bool: true
    })
    store.dispatch('setScoreToZero').then(() => {
      next()
    })
  },
  data() {
    return {
      pieces: [],
      squares: [],
      nextSquares: [],
      random: null,
      currentPiece: [],
      nextPiece: [],
      timer: '',
      currentScore: {
        name: '',
        score: null
      },
      showModal: false,
      mouseOverGame: false,
      possiblePlacements: [],
      nextPieceDivs: [],
      placementIndex: 0,
      profanityList: [
        `5h1t`,
        `5hit`,
        `a55`,
        `anal`,
        `anus`,
        `ar5e`,
        `arrse`,
        `arse`,
        `ass`,
        `ass-fucker`,
        `asses`,
        `assfucker`,
        `assfukka`,
        `asshole`,
        `assholes`,
        `asswhole`,
        `a_s_s`,
        `b!tch`,
        `b00bs`,
        `b17ch`,
        `b1tch`,
        `ballbag`,
        `balls`,
        `ballsack`,
        `bastard`,
        `beastial`,
        `beastiality`,
        `bellend`,
        `bestial`,
        `bestiality`,
        `bi+ch`,
        `biatch`,
        `bitch`,
        `bitcher`,
        `bitchers`,
        `bitches`,
        `bitchin`,
        `bitching`,
        `bloody`,
        `blow job`,
        `blowjob`,
        `blowjobs`,
        `boiolas`,
        `bollock`,
        `bollok`,
        `boner`,
        `boob`,
        `boobs`,
        `booobs`,
        `boooobs`,
        `booooobs`,
        `booooooobs`,
        `breasts`,
        `buceta`,
        `bugger`,
        `bum`,
        `bunny fucker`,
        `butt`,
        `butthole`,
        `buttmuch`,
        `buttplug`,
        `c0ck`,
        `c0cksucker`,
        `carpet muncher`,
        `cawk`,
        `chink`,
        `cipa`,
        `cl1t`,
        `clit`,
        `clitoris`,
        `clits`,
        `cnut`,
        `cock`,
        `cock-sucker`,
        `cockface`,
        `cockhead`,
        `cockmunch`,
        `cockmuncher`,
        `cocks`,
        `cocksuck `,
        `cocksucked `,
        `cocksucker`,
        `cocksucking`,
        `cocksucks `,
        `cocksuka`,
        `cocksukka`,
        `cok`,
        `cokmuncher`,
        `coksucka`,
        `coon`,
        `cox`,
        `crap`,
        `cum`,
        `cummer`,
        `cumming`,
        `cums`,
        `cumshot`,
        `cunilingus`,
        `cunillingus`,
        `cunnilingus`,
        `cunt`,
        `cuntlick `,
        `cuntlicker `,
        `cuntlicking `,
        `cunts`,
        `cyalis`,
        `cyberfuc`,
        `cyberfuck `,
        `cyberfucked `,
        `cyberfucker`,
        `cyberfuckers`,
        `cyberfucking `,
        `d1ck`,
        `damn`,
        `dick`,
        `dickhead`,
        `dildo`,
        `dildos`,
        `dink`,
        `dinks`,
        `dirsa`,
        `dlck`,
        `dog-fucker`,
        `doggin`,
        `dogging`,
        `donkeyribber`,
        `doosh`,
        `duche`,
        `dyke`,
        `ejaculate`,
        `ejaculated`,
        `ejaculates `,
        `ejaculating `,
        `ejaculatings`,
        `ejaculation`,
        `ejakulate`,
        `f u c k`,
        `f u c k e r`,
        `f4nny`,
        `fag`,
        `fagging`,
        `faggitt`,
        `faggot`,
        `faggs`,
        `fagot`,
        `fagots`,
        `fags`,
        `fanny`,
        `fannyflaps`,
        `fannyfucker`,
        `fanyy`,
        `fatass`,
        `fcuk`,
        `fcuker`,
        `fcuking`,
        `feck`,
        `fecker`,
        `felching`,
        `fellate`,
        `fellatio`,
        `fingerfuck `,
        `fingerfucked `,
        `fingerfucker `,
        `fingerfuckers`,
        `fingerfucking `,
        `fingerfucks `,
        `fistfuck`,
        `fistfucked `,
        `fistfucker `,
        `fistfuckers `,
        `fistfucking `,
        `fistfuckings `,
        `fistfucks `,
        `flange`,
        `fook`,
        `fooker`,
        `fuck`,
        `fucka`,
        `fucked`,
        `fucker`,
        `fuckers`,
        `fuckhead`,
        `fuckheads`,
        `fuckin`,
        `fucking`,
        `fuckings`,
        `fuckingshitmotherfucker`,
        `fuckme `,
        `fucks`,
        `fuckwhit`,
        `fuckwit`,
        `fudge packer`,
        `fudgepacker`,
        `fuk`,
        `fuker`,
        `fukker`,
        `fukkin`,
        `fuks`,
        `fukwhit`,
        `fukwit`,
        `fux`,
        `fux0r`,
        `f_u_c_k`,
        `gangbang`,
        `gangbanged `,
        `gangbangs `,
        `gaylord`,
        `gaysex`,
        `goatse`,
        `God`,
        `god-dam`,
        `god-damned`,
        `goddamn`,
        `goddamned`,
        `hardcoresex `,
        `hell`,
        `heshe`,
        `hoar`,
        `hoare`,
        `hoer`,
        `homo`,
        `hore`,
        `horniest`,
        `horny`,
        `hotsex`,
        `jack-off `,
        `jackoff`,
        `jap`,
        `jerk-off `,
        `jism`,
        `jiz `,
        `jizm `,
        `jizz`,
        `kawk`,
        `knob`,
        `knobead`,
        `knobed`,
        `knobend`,
        `knobhead`,
        `knobjocky`,
        `knobjokey`,
        `kock`,
        `kondum`,
        `kondums`,
        `kum`,
        `kummer`,
        `kumming`,
        `kums`,
        `kunilingus`,
        `l3i+ch`,
        `l3itch`,
        `labia`,
        `lmfao`,
        `lust`,
        `lusting`,
        `m0f0`,
        `m0fo`,
        `m45terbate`,
        `ma5terb8`,
        `ma5terbate`,
        `masochist`,
        `master-bate`,
        `masterb8`,
        `masterbat*`,
        `masterbat3`,
        `masterbate`,
        `masterbation`,
        `masterbations`,
        `masturbate`,
        `mo-fo`,
        `mof0`,
        `mofo`,
        `mothafuck`,
        `mothafucka`,
        `mothafuckas`,
        `mothafuckaz`,
        `mothafucked `,
        `mothafucker`,
        `mothafuckers`,
        `mothafuckin`,
        `mothafucking `,
        `mothafuckings`,
        `mothafucks`,
        `mother fucker`,
        `motherfuck`,
        `motherfucked`,
        `motherfucker`,
        `motherfuckers`,
        `motherfuckin`,
        `motherfucking`,
        `motherfuckings`,
        `motherfuckka`,
        `motherfucks`,
        `muff`,
        `mutha`,
        `muthafecker`,
        `muthafuckker`,
        `muther`,
        `mutherfucker`,
        `n1gga`,
        `n1gger`,
        `nazi`,
        `nigg3r`,
        `nigg4h`,
        `nigga`,
        `niggah`,
        `niggas`,
        `niggaz`,
        `nigger`,
        `niggers `,
        `nob`,
        `nob jokey`,
        `nobhead`,
        `nobjocky`,
        `nobjokey`,
        `numbnuts`,
        `nutsack`,
        `orgasim `,
        `orgasims `,
        `orgasm`,
        `orgasms `,
        `p0rn`,
        `pawn`,
        `pecker`,
        `penis`,
        `penisfucker`,
        `phonesex`,
        `phuck`,
        `phuk`,
        `phuked`,
        `phuking`,
        `phukked`,
        `phukking`,
        `phuks`,
        `phuq`,
        `pigfucker`,
        `pimpis`,
        `piss`,
        `pissed`,
        `pisser`,
        `pissers`,
        `pisses `,
        `pissflaps`,
        `pissin `,
        `pissing`,
        `pissoff `,
        `poop`,
        `porn`,
        `porno`,
        `pornography`,
        `pornos`,
        `prick`,
        `pricks `,
        `pron`,
        `pube`,
        `pusse`,
        `pussi`,
        `pussies`,
        `pussy`,
        `pussys `,
        `rectum`,
        `retard`,
        `rimjaw`,
        `rimming`,
        `s hit`,
        `s.o.b.`,
        `sadist`,
        `schlong`,
        `screwing`,
        `scroat`,
        `scrote`,
        `scrotum`,
        `semen`,
        `sex`,
        `sh!+`,
        `sh!t`,
        `sh1t`,
        `shag`,
        `shagger`,
        `shaggin`,
        `shagging`,
        `shemale`,
        `shi+`,
        `shit`,
        `shitdick`,
        `shite`,
        `shited`,
        `shitey`,
        `shitfuck`,
        `shitfull`,
        `shithead`,
        `shiting`,
        `shitings`,
        `shits`,
        `shitted`,
        `shitter`,
        `shitters `,
        `shitting`,
        `shittings`,
        `shitty `,
        `skank`,
        `slut`,
        `sluts`,
        `smegma`,
        `smut`,
        `snatch`,
        `son-of-a-bitch`,
        `spac`,
        `spunk`,
        `s_h_i_t`,
        `t1tt1e5`,
        `t1tties`,
        `teets`,
        `teez`,
        `testical`,
        `testicle`,
        `tit`,
        `titfuck`,
        `tits`,
        `titt`,
        `tittie5`,
        `tittiefucker`,
        `titties`,
        `tittyfuck`,
        `tittywank`,
        `titwank`,
        `tosser`,
        `turd`,
        `tw4t`,
        `twat`,
        `twathead`,
        `twatty`,
        `twunt`,
        `twunter`,
        `v14gra`,
        `v1gra`,
        `vagina`,
        `viagra`,
        `vulva`,
        `w00se`,
        `wang`,
        `wank`,
        `wanker`,
        `wanky`,
        `whoar`,
        `whore`,
        `willies`,
        `willy`,
        `xrated`,
        `xxx`
      ]
    }
  },
  computed: {
    ...mapState({
      width: 'width',
      score: 'score',
      boolGameOff: 'boolGameOff'
    })
  },
  methods: {
    allPossibleMoves() {
      var width = 1
      var height = 1
      for (let h = 0; h < this.currentPiece.length; h++) {
        var num = this.currentPiece[h].toString()
        var intNum = parseInt(num[0])
        if (num.length > 1 && intNum + 1 > height) {
          height = intNum + 1
        }
        if (this.currentPiece[h] % 10 > width - 1) {
          width = (this.currentPiece[h] % 10) + 1
        }
      }
      function isGoodPlacement(block) {
        return !block.classList.contains('placed')
      }
      var allCanBePlaced = []
      var allPossiblePlacements = []
      for (let i = 0; i < 10 * (this.width + 1 - height); i += this.width) {
        for (let j = 0; j < this.width + 1 - width; j++) {
          var squares_being_tested = []
          var pieceBlocks = []
          for (let k = 0; k < this.currentPiece.length; k++) {
            squares_being_tested.push(
              this.squares[i + j + this.currentPiece[k]]
            )
            pieceBlocks.push(this.squares[i + j + this.currentPiece[k]])
          }
          if (pieceBlocks.every(isGoodPlacement)) {
            allPossiblePlacements.push(pieceBlocks)
          }
          var canBePlaced = true
          for (let l = 0; l < squares_being_tested.length; l++) {
            if (squares_being_tested[l].classList.contains('placed')) {
              canBePlaced = false
            }
          }
          allCanBePlaced.push(canBePlaced)
        }
      }
      this.possiblePlacements = allPossiblePlacements
      if (allCanBePlaced.every(bool => bool === false)) {
        this.setGameOff(true)
        this.gameOver()
      }
    },
    getSquares() {
      this.squares = Array.from(document.querySelectorAll('.main-grid div'))
      this.nextSquares = Array.from(document.querySelectorAll('.next-grid div'))
    },
    createPieces() {
      this.pieces = [
        {
          lOne: [
            0,
            this.width,
            this.width * 2,
            this.width * 2 + 1,
            this.width * 2 + 2
          ]
        },
        {
          lTwo: [2, 1, 0, this.width, this.width * 2]
        },
        {
          lThree: [0, 1, 2, this.width + 2, this.width * 2 + 2]
        },
        {
          lFour: [
            2,
            this.width + 2,
            this.width * 2 + 2,
            this.width * 2 + 1,
            this.width * 2
          ]
        },
        { smallSquare: [0, 1, this.width, this.width + 1] },
        {
          bigSquare: [
            0,
            1,
            2,
            this.width,
            this.width + 1,
            this.width + 2,
            this.width * 2,
            this.width * 2 + 1,
            this.width * 2 + 2
          ]
        },
        {
          oneByOne: [0]
        },
        {
          oneByTwo: [0, 1]
        },
        {
          oneByThree: [0, 1, 2]
        },
        {
          oneByFour: [0, 1, 2, 3]
        },
        {
          oneByFive: [0, 1, 2, 3, 4]
        },
        {
          twoByOne: [0, this.width]
        },
        {
          threeByOne: [0, this.width, this.width * 2]
        },
        {
          fourByOne: [0, this.width, this.width * 2, this.width * 3]
        },
        {
          fiveByOne: [
            0,
            this.width,
            this.width * 2,
            this.width * 3,
            this.width * 4
          ]
        },
        {
          lFive: [0, 1, this.width + 1]
        },
        {
          lSix: [1, this.width + 1, this.width]
        },
        {
          lSeven: [this.width + 1, this.width, 0]
        },
        {
          lEight: [this.width, 0, 1]
        }
      ]
    },
    getRandomCurrent() {
      this.random = Math.floor(Math.random() * this.pieces.length)
      this.nextPiece = Object.values(this.pieces[this.random])[0]
    },
    drawPiece() {
      if (!this.boolGameOff) {
        this.possiblePlacements[this.placementIndex].forEach(index => {
          index.classList.add('piece')
        })
      }
    },
    drawNextPiece() {
      if (!this.boolGameOff) {
        this.nextPiece.forEach(block => {
          let pieceIndex = block
          if (pieceIndex === 10) {
            pieceIndex = 5
          } else if (pieceIndex === 11) {
            pieceIndex = 6
          } else if (pieceIndex === 12) {
            pieceIndex = 7
          } else if (pieceIndex === 20) {
            pieceIndex = 10
          } else if (pieceIndex === 21) {
            pieceIndex = 11
          } else if (pieceIndex === 22) {
            pieceIndex = 12
          } else if (pieceIndex === 30) {
            pieceIndex = 15
          } else if (pieceIndex === 40) {
            pieceIndex = 20
          }
          this.nextPieceDivs.push(this.nextSquares[pieceIndex])
        })
        this.nextPieceDivs.forEach(index => {
          index.classList.add('piece')
        })
      }
    },
    undrawPiece() {
      if (!this.boolGameOff) {
        this.possiblePlacements[this.placementIndex].forEach(index => {
          index.classList.remove('piece')
        })
      }
    },
    undrawNextPiece() {
      if (!this.boolGameOff) {
        this.nextPieceDivs = []
      }
    },
    movePiece(num) {
      this.undrawPiece()
      if (this.placementIndex === 0 && num < 0) {
        this.placementIndex = this.possiblePlacements.length - 1
      } else if (
        this.placementIndex === this.possiblePlacements.length - 1 &&
        num > 0
      ) {
        this.placementIndex = 0
      } else {
        this.placementIndex += num
      }
      this.drawPiece()
    },
    checkScrollDirection(event) {
      if (!this.boolGameOff && this.mouseOverGame) {
        if (event.wheelDeltaY > 13) {
          this.movePiece(1)
        } else if (event.wheelDeltaY < -13) {
          this.movePiece(-1)
        }
      }
    },
    control(e) {
      if (!this.boolGameOff)
        if (e.keyCode === 39) {
          this.movePiece(1)
        } else if (e.keyCode === 13) {
          this.placePiece()
        } else if (e.keyCode === 37) {
          this.movePiece(-1)
        }
    },
    placePiece() {
      if (!this.boolGameOff) {
        const isOccupied = this.possiblePlacements[
          this.placementIndex
        ].some(index => index.classList.contains('placed'))
        if (!isOccupied) {
          this.possiblePlacements[this.placementIndex].forEach(index => {
            index.classList.remove('piece')
            index.classList.add('placed')
          })
          this.nextPieceDivs.forEach(index => {
            index.classList.remove('piece')
          })
          this.nextPieceDivs = []
          store.dispatch('changeScore', this.currentPiece.length)
          this.placementIndex = 0
          this.currentPiece = this.nextPiece
          this.getRandomCurrent()
          this.checkFill()
          this.allPossibleMoves()
          this.drawPiece()
          this.drawNextPiece()
        }
      }
    },
    checkFill() {
      const removed = []
      for (let i = 0; i < 99; i += this.width) {
        const row = [
          i,
          i + 1,
          i + 2,
          i + 3,
          i + 4,
          i + 5,
          i + 6,
          i + 7,
          i + 8,
          i + 9
        ]
        if (
          row.every(index => this.squares[index].classList.contains('placed'))
        ) {
          row.forEach(index => {
            if (!removed.includes(index)) {
              removed.push(index)
            }
          })
        }
      }
      for (let i = 0; i < 10; i++) {
        const column = [
          0 + i,
          10 + i,
          20 + i,
          30 + i,
          40 + i,
          50 + i,
          60 + i,
          70 + i,
          80 + i,
          90 + i
        ]
        if (
          column.every(index =>
            this.squares[index].classList.contains('placed')
          )
        ) {
          column.forEach(index => {
            if (!removed.includes(index)) {
              removed.push(index)
            }
          })
        }
      }
      store.dispatch('changeScore', removed.length)
      removed.forEach(index => {
        this.squares[index].classList.remove('placed')
      })
    },
    gameOver() {
      this.$bvModal.show('end-modal')
    },
    setGameOff(bool) {
      store.dispatch('changeBoolGameOff', {
        bool: bool
      })
    },
    submitScore() {
      // store.dispatch('postScore', {
      //   score: this.currentScore
      // })
      store.dispatch('postScoreMongo', {
        score: this.currentScore.score,
        name: this.currentScore.name
      })
    },
    checkNameFill() {
      if (this.currentScore.name === '') {
        return true
      } else if (this.profanityList.includes(this.currentScore.name)) {
        return true
      }
      return false
    },
    resetGame() {
      // set up score object to be posted to high scores list
      this.$bvModal.hide('end-modal')
      this.currentScore.score = this.score
      this.submitScore()
      store.dispatch('setScoreToZero')
      this.squares.forEach(square => {
        square.classList.remove('placed')
        square.classList.remove('piece')
      })
      this.undrawPiece()
      this.undrawNextPiece()
      this.random = Math.floor(Math.random() * this.pieces.length)
      this.currentPiece = Object.values(this.pieces[this.random])[0]
      this.getRandomCurrent()
      this.drawPiece()
      this.drawNextPiece()
    },
    ...mapActions([
      'changeScore',
      'postScore',
      'postScoreMongo',
      'setScoreToZero',
      'changeBoolGameOff'
    ])
  },
  created() {
    this.createPieces()
    this.random = Math.floor(Math.random() * this.pieces.length)
    this.currentPiece = Object.values(this.pieces[this.random])[0]
    this.getRandomCurrent()
    this.timer = setTimeout(() =>
      document.addEventListener('keyup', this.control)
    )
    this.timer2 = setTimeout(() => {
      document.body.addEventListener('wheel', this.checkScrollDirection)
    })
  },
  mounted() {
    this.getSquares()
    this.allPossibleMoves()
    this.drawPiece()
    this.drawNextPiece()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.small-grid {
  width: 200px;
  height: 200px;
  border: #333333 5px solid;
  margin: 0 auto;
  margin-bottom: 25px;
}
.modal-class {
  /* width: 200px;
  height: 150px; */
  width: 100%;
  height: 100%;
}
.main-grid {
  width: 420px;
  height: 420px;
  flex-wrap: wrap;
  display: flex;
  background-color: peachpuff;
  border: #000000 10px solid;
  margin: 0 auto;
}
.main-grid div {
  height: 40px;
  width: 40px;
  border: #ffffff 1px solid;
  margin: 0px;
  padding: 0px;
}
.next-grid {
  width: 220px;
  height: 220px;
  flex-wrap: wrap;
  display: flex;
  background-color: peachpuff;
  border: #000000 10px solid;
  margin: 0 auto;
  margin-top: 5px;
}
.next-grid div {
  height: 40px;
  width: 40px;
  border: #ffffff 1px solid;
  margin: 0px;
  padding: 0px;
}
.piece {
  background-color: blue;
}
.placed {
  background-color: red;
}
</style>
