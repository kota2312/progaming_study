import Link from "next/link";

export default function Footer() {
    return(
        <footer>
            <div class="f-main l-inner1">
                    <div class="f-info">
                        <a href="/" class="f-logo"> <img alt="" src="/wp-content/uploads/2024/02/mainlogo.png" data-src="/wp-content/uploads/2024/01/logo-1.png" class=" ls-is-cached lazyloaded" /><noscript><img alt="" src="/wp-content/uploads/2024/01/logo-1.png" /></noscript> </a>
                        <div class="f-block1 u-mt30px u-mt2em--sp">
                            <div class="u-flex u-mt40px u-mt2em--sp">
                            </div>
                        </div>
                    </div>
                    <div class="f-nav">
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/solution/">Solution</a></li>
                                </ul>
                                <ul>
                                        <li><a href="/web-plan/">WEBプラン</a></li>
                                    <li><a href="/movie-plan/">映像プラン</a></li>
                        </ul>
                        <ul>
                            <li><a href="/company/">Company</a></li>
                                        <li><a href="/faq/">FAQ</a></li>
                        </ul>
                        <ul>
                                        <li><a href="#">個人情報等の取り扱いについて</a></li>
                        <li><a href="#">利用規約</a></li>
                        </ul>
                    </div>
            </div>
        </footer>
    )
}