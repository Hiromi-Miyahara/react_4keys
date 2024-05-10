import React　from 'react';

function calendarModalHtml(){

    const dayCell = (day) => {
        return (
        <td class="p-calendar__cell">
            <div class="p-calendar__cell--layer js-target-selectedLine">
                <div class="default-padding pointer u-hide js-target-edgeMark js-target-dateInfo">{day}</div>
            </div>
        </td>)   
    };

    const weekCell = () => {
        const weekDays = [1, 2, 3, 4, 5, 6, 7];
        return (
            <tr class="p-calendar__week">
                {weekDays.map(day => dayCell(day))}
            </tr>
        )
    };

    const monthCell = () => {
        return (
            <>
                {weekCell()}
                {weekCell()}
                {weekCell()}
                {weekCell()}
                {weekCell()}
            </>
        );
    }
    
    

// TODO: 
    // 1. 一月分のhtmlが綺麗に表示されるようにする
        // a. 一月分の日付がカレンダーのように表示される
            // 1. 現在の月の最初の日付と最後の日付を取得する。
            // 2. 現在の月の最初と最後の日付の曜日を取得する。
            // 3. 最初の日の前よりの曜日、最後より後の曜日は他のhtml要素を放り込んでさわれないようにする必要がある
        // b. viewを整える
    // 2. 一月をテンプレートに分けて、複数付きが表示できるようにする
    // 3. クリックしたら色とかが付くようにできる
    // 4. クリックした値をstateとかで保持できる

    return(
        <div class="p-calendar">
        <div class="p-calendar__header">
          <p class="p-calendar__title js-target-calendarHeaderTitle"></p>
          <p class="p-calendar__duration js-target-calendarHeaderPeriod"></p>
        </div>
        <div class="p-calendar__container">
          <table class="p-calendar__table">
            <tr class="p-calendar__weekHeader">
              <th class="p-calendar__weekDay">日</th>
              <th class="p-calendar__weekDay">月</th>
              <th class="p-calendar__weekDay">火</th>
              <th class="p-calendar__weekDay">水</th>
              <th class="p-calendar__weekDay">木</th>
              <th class="p-calendar__weekDay">金</th>
              <th class="p-calendar__weekDay">土</th>
            </tr>
            {monthCell()}
            {/* ここから下はテンプレートなので、特別に何かしない限り使われることはない */}
            <template id="month-template">
              <table class='p-calendar__month'>
                <caption class='p-calendar__displayMonth js-target-displayMonth'></caption>
              </table>
            </template>
            <template id="week-template">
              <tr class="p-calendar__week">
                {/* したの部分を7回繰り返すことで、一月分のcellを作成することができる */}
                  <td class="p-calendar__cell">
                    <div class="p-calendar__cell--layer js-target-selectedLine">
                      <div class="default-padding pointer u-hide js-target-edgeMark js-target-dateInfo"></div>
                    </div>
                  </td>
              </tr>
            </template>

          </table>
          <div class="p-calendar__content js-target-createCalendar"></div>
          <div class="p-calendar__footer">
            <p class="cancel-btn js-click-cancel-btn">キャンセル</p>
          </div>
        </div>
      </div>
    )
}

export {calendarModalHtml};