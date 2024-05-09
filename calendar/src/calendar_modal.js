import logo from './logo.svg';
import React, { useState } from 'react';

function calendarModalHtml(){
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
            <template id="month-template">
              <table class='p-calendar__month'>
                <caption class='p-calendar__displayMonth js-target-displayMonth'></caption>
              </table>
            </template>
            <template id="week-template">
              <tr class="p-calendar__week">
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
            <a class="cancel-btn js-click-cancel-btn">キャンセル</a>
          </div>
        </div>
      </div>
    )
}

export {calendarModalHtml};