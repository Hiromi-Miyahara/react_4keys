import React　from 'react';

function calendarModalHtml(){

    const dayCell = (day) => {
        return (
        <td className="p-calendar__cell">
            <div className="p-calendar__cell--layer js-target-selectedLine">
                <div className="default-padding pointer u-hide js-target-edgeMark js-target-dateInfo">{day}</div>
            </div>
        </td>)   
    };

    const weekCell = () => {
        const weekDays = [1, 2, 3, 4, 5, 6, 7];
        return (
            <tr className="p-calendar__week">
                {weekDays.map(day => dayCell(day))}
            </tr>
        )
    };

    const monthCell = () => {
        const thisMonth = new Date()

        const getLastDay = (year, month) => {
            return new Date(year, month, 0).getDate();
        };

        const getMonthLastDay = (thisMonth) => {
            thisMonth.setMonth(thisMonth.getMonth() + 1);
            return thisMonth.setDate(0);
        }

        const getMonthFirstDay = (thisMonth) => {
            return new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
        }

        const monthArray = (times)=> {
            const array = [];
            for (let i = 0; i < times; i++) {
                array.push(i);
            }
            return array;
        };

        const monthFirstDayType = getMonthFirstDay(thisMonth).getDay();
        const thisMonthLength = getLastDay(2024, 5);
        const monthLastDayType = getMonthLastDay(thisMonth);

        const thisMonthArray = monthArray(thisMonthLength);
        thisMonthArray.unshift('blank'* monthFirstDayType);
console.log(thisMonthArray);

        // const monthLastDay = lastMonth.setDate(0)
        // 1. その週の日付が配列として入ってくる。blankなら''、日付なら日付を入れる
        // 2. 今月の最初の日付の曜日を取得、差分をループの最初に加える月最後の差分はループの最後に加える

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
//  1. 一月分のhtmlが綺麗に表示されるようにする
//     a. 一月分の日付がカレンダーのように表示される
//         1. 現在の月の最初の日付と最後の日付を取得する。
//         2. 現在の月の最初と最後の日付の曜日を取得する。
//         3. 最初の日の前よりの曜日、最後より後の曜日は他のhtml要素を放り込んでさわれないようにする必要がある
//     b. viewを整える
//  2. 一月をテンプレートに分けて、複数付きが表示できるようにする
//  3. クリックしたら色とかが付くようにできる
//  4. クリックした値をstateとかで保持できる

    return(
        <div className="p-calendar">
        <div className="p-calendar__header">
          <p className="p-calendar__title js-target-calendarHeaderTitle"></p>
          <p className="p-calendar__duration js-target-calendarHeaderPeriod"></p>
        </div>
        <div className="p-calendar__container">
          <table className="p-calendar__table">
            <tr className="p-calendar__weekHeader">
              <th className="p-calendar__weekDay">日</th>
              <th className="p-calendar__weekDay">月</th>
              <th className="p-calendar__weekDay">火</th>
              <th className="p-calendar__weekDay">水</th>
              <th className="p-calendar__weekDay">木</th>
              <th className="p-calendar__weekDay">金</th>
              <th className="p-calendar__weekDay">土</th>
            </tr>
            {monthCell()}
            {/* ここから下はテンプレートなので、特別に何かしない限り使われることはない */}
            <template id="month-template">
              <table className='p-calendar__month'>
                <caption className='p-calendar__displayMonth js-target-displayMonth'></caption>
              </table>
            </template>
            <template id="week-template">
              <tr className="p-calendar__week">
                {/* したの部分を7回繰り返すことで、一月分のcellを作成することができる */}
                  <td className="p-calendar__cell">
                    <div className="p-calendar__cell--layer js-target-selectedLine">
                      <div className="default-padding pointer u-hide js-target-edgeMark js-target-dateInfo"></div>
                    </div>
                  </td>
              </tr>
            </template>

          </table>
          <div className="p-calendar__content js-target-createCalendar"></div>
          <div className="p-calendar__footer">
            <p className="cancel-btn js-click-cancel-btn">キャンセル</p>
          </div>
        </div>
      </div>
    )
}

export {calendarModalHtml};
