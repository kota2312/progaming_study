import React from "react";
import Link from "next/link";
import Image from 'next/image';

export default function Footer() {
    return(
        <header class="header">
            <div class="header__logo">
                <a href="."><img src="img/TKlogo.png" alt="START" /></a>
            </div>
            <div class="header__nav">
                <nav class="gnav">
                    <ul class="gnav__list">
                        <li class="gnav__item"><a class="gnav__link gnav__link--active" href=".">ホーム</a></li>
                        <li class="gnav__item"><a class="gnav__link" href="message.html">メッセージ</a></li>
                        <li class="gnav__item"><a class="gnav__link" href="company.html">会社概要</a></li>
                    </ul>
                </nav>
                <button type="button" id="js-btn-menu" class="btn-menu">
                    <span class="btn-menu__line"></span>
                </button>
            </div>
        </header>
    )
}