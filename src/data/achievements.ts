// src/data/achievements.ts — 業績データ
// 各カテゴリは { ja, en, items } の構造。
// items の date は year+month (降順)。

export type AchievementItem = {
  year: number
  month?: number
  role?: string
  title: string
  venue: string
  url?: string
  kind?: 'journal' | 'workshop' | 'book'
  co?: string
  country?: 'jp' | 'intl'
}

export type AchievementCategory = {
  ja: string
  en: string
  items: AchievementItem[]
}

export type AchievementsData = {
  awards: AchievementCategory
  papers: AchievementCategory
  writing: AchievementCategory
  talks: AchievementCategory
}

export const achievements: AchievementsData = {
  awards: {
    ja: '受賞', en: 'Awards',
    items: [
      { year: 2015, month: 10, title: '第10回 日本OSS奨励賞', venue: 'Serverspec開発によるインフラ自動化への貢献', url: 'http://www.ossforum.jp/ossaward10th2' },
      { year: 2014, month: 1,  title: 'Black Duck Open Source Rookies of the Year 2013', venue: 'Serverspecが2013年の優れた新OSSプロジェクト10種に選出', url: 'https://mag.osdn.jp/14/01/29/190000' },
    ],
  },
  papers: {
    ja: '論文', en: 'Papers',
    items: [
      { year: 2020, month: 3, title: 'Serverspec: 宣言的記述でサーバの設定状態をテスト可能な汎用性の高いテストフレームワーク', venue: '情報処理学会論文誌, Vol.61, No.3, pp.677-686', url: 'http://id.nii.ac.jp/1001/00204179/', kind: 'journal' },
      { year: 2018, month: 3, title: '分散型データセンターOSを目指したリアクティブ性を持つコンテナ実行基盤技術', venue: '情報処理学会研究報告 IOT, No.2019-IOT-44, Vol.27', url: 'http://id.nii.ac.jp/1001/00194721/', kind: 'workshop', co: '松本 亮介, 坪内 佑樹' },
      { year: 2014, month: 2, title: 'serverspec: 宣言的記述でサーバの状態をテスト可能な汎用性の高いテストフレームワーク', venue: '情報処理学会研究報告 IOT, 2014-IOT-24(15)', url: 'http://id.nii.ac.jp/1001/00095297/', kind: 'workshop' },
    ],
  },
  writing: {
    ja: '書籍・記事', en: 'Writing',
    items: [
      { year: 2026, month: 2,  title: 'OSSは特別じゃない。アウトプットを30年間続けてきて得たもの', venue: 'Findy', url: 'https://findy-code.io/media/articles/codesidechat-gosukenator' },
      { year: 2019, month: 10, title: '「超個体型データセンター」コンセプトで目指す未来像', venue: 'ASCII.jp TECH 連載', url: 'https://ascii.jp/elem/000/001/963/1963013/' },
      { year: 2018, month: 3,  title: 'オープンさは私のキャリアの原動力', venue: 'GeekOut', url: 'https://geek-out.jp/column/entry/2018/03/08/110000/' },
      { year: 2018, month: 1,  title: '「一つのことをうまくやる」に忠実たれ', venue: 'エンジニアHub', url: 'https://eh-career.com/engineerhub/entry/2018/01/31/110000' },
      { year: 2017, month: 3,  title: 'Infrastructure as Code', venue: 'O\'Reilly Japan(監訳)', url: 'https://www.oreilly.co.jp/books/9784873117966/', kind: 'book' },
      { year: 2015, month: 1,  title: 'Serverspec', venue: 'O\'Reilly Japan(著)', url: 'https://www.oreilly.co.jp/books/9784873117096/', kind: 'book' },
      { year: 2014, month: 6,  title: 'テスト駆動インフラ／インフラCIの潮流、Serverspecが果たす役割', venue: 'Think IT', url: 'https://thinkit.co.jp/story/2014/06/24/5070' },
      { year: 2014, month: 4,  title: '実践テスト駆動インフラ＆CI', venue: 'WEB+DB PRESS Vol.80', url: 'https://gihyo.jp/magazine/wdpress/archive/2014/vol80' },
      { year: 2013, month: 4,  title: '宮下剛輔(mizzy)〜はたらきながら大学に通う', venue: 'gihyo.jp', url: 'https://gihyo.jp/lifestyle/serial/01/shukatsu_joshi/0004' },
      { year: 2009, month: 7,  title: 'サーバスペックの向上を実現するために', venue: 'CNET Japan', url: 'https://japan.cnet.com/extra/paperboy_0907/story/0,3800098768,20394957,00.htm' },
      { year: 2009, month: 3,  title: 'システム運用／管理に役立つ「開発力」', venue: 'Software Design 2009年4月号', url: 'https://gihyo.jp/magazine/SD/archive/2009/200904' },
      { year: 2008, month: 10, title: 'Webエンジニア武勇伝', venue: 'web-engineer.buyuden.net', url: 'http://web-engineer.buyuden.net/interview/miyashita/' },
      { year: 2008, month: 7,  title: '自分を知ってもらう努力をしよう', venue: '@IT 自分戦略研究所', url: 'https://jibun.atmarkit.co.jp/lcom01/rensai/comrade04/comrade01.html' },
      { year: 2007, month: 11, title: 'Puppetでシステム管理を自動化しよう', venue: 'Software Design 2007年12月号', url: 'https://gihyo.jp/magazine/SD/archive/2007/200712' },
      { year: 2007, month: 6,  title: 'オープンソースなシステム自動管理ツール Puppet', venue: 'gihyo.jp(連載)', url: 'https://gihyo.jp/admin/serial/01/puppet' },
    ],
  },
  talks: {
    ja: '登壇', en: 'Talks',
    items: [
      { year: 2025, month: 11, title: 'なぜインフラコードのモジュール化は難しいのか - アプリケーションコードとの本質的な違いから考える', venue: 'YAPC::Fukuoka 2025', url: 'https://speakerdeck.com/mizzy/yapc-fukuoka-2025', country: 'jp' },
      { year: 2020, month: 11, title: 'Configuration Managementツールのポリシー定義用中間言語に関する考察', venue: '第7回 WSA研究会', url: 'https://mizzy.org/blog/2020/11/06/1', country: 'jp' },
      { year: 2020, month: 10, title: 'Infrastructure as Codeのこれまでとこれから', venue: '第5回さくらインターネット研究会', url: 'https://speakerdeck.com/mizzy/past-and-future-of-infrastructure-as-code', country: 'jp' },
      { year: 2020, month: 4,  title: 'Infrastructure as Codeのこれまでとこれから', venue: 'Infra Study Meetup #1', url: 'https://speakerdeck.com/mizzy/infra-study-meetup-number-1', country: 'jp' },
      { year: 2019, month: 3,  title: 'OCIランタイム比較のためにやっていることあれこれ', venue: 'Hosting Casual Talks #5', url: 'https://speakerdeck.com/mizzy/compare-oci-runtimes', country: 'jp' },
      { year: 2018, month: 9,  title: '運用管理OSS Serverspecの公開とその影響', venue: '電子情報通信学会ソサイエティ大会 2018', url: 'https://speakerdeck.com/mizzy/serverspec-and-oss-at-ieice-society-conference-2018', country: 'jp' },
      { year: 2017, month: 11, title: 'Rustで書いたライブラリをRuby/mrubyから呼び出す実践的な方法', venue: '福岡Ruby会議02', url: 'https://speakerdeck.com/mizzy/mruby', country: 'jp' },
      { year: 2017, month: 11, title: 'libspecinfraの概要と現状と今後', venue: 'MasterCloud #7', url: 'https://speakerdeck.com/mizzy/overview-of-libspecinfra-project', country: 'jp' },
      { year: 2016, month: 12, title: 'Infrastructure as Codeとは何かそして何であるべきか', venue: 'Codenize Meetup', url: 'https://speakerdeck.com/mizzy/infrastructure-as-code-at-codenize-meetup', country: 'jp' },
      { year: 2016, month: 7,  title: 'Infrastructure as Code のこれまでとこれから', venue: '第三回リクルートテクノロジーズオープンラボ', url: 'https://speakerdeck.com/mizzy/infrastructure-as-code', country: 'jp' },
      { year: 2016, month: 2,  title: 'Walter ファミリーの紹介', venue: 'Shibuya.go #1', url: 'https://www.slideshare.net/mizzy/walter-at-shibuyago1', country: 'jp' },
      { year: 2015, month: 9,  title: 'Serverspec', venue: 'Testing Framework Meeting', url: 'https://www.slideshare.net/mizzy/serverspec-at-testing-framework-meeting', country: 'jp' },
      { year: 2014, month: 6,  title: 'Serverspecに見る技術トレンドを生み出すヒント', venue: 'JTF 2014', url: 'https://speakerdeck.com/mizzy/serverspec-at-jtf2014', country: 'jp' },
      { year: 2014, month: 4,  title: 'Serverspec: The Simplest Server Testing Tool Ever', venue: 'ChefConf 2014', url: 'https://speakerdeck.com/mizzy/serverspec-the-simplest-server-testing-tool-ever', country: 'intl' },
      { year: 2014, month: 3,  title: 'Immutable Infrastructure時代の構成管理ツールSpecInfra', venue: 'JAWS DAYS 2014', url: 'https://speakerdeck.com/mizzy/specinfra-at-jaws-days-2014', country: 'jp' },
      { year: 2014, month: 3,  title: 'Immutable InfrastructureとProvisioning Testing', venue: 'Immutable Infrastructure Conference #1', url: 'https://speakerdeck.com/mizzy/immutable-infrastructure-and-provisioning-testing-at-immutable-infrastructure-conference-number-01', country: 'jp' },
      { year: 2014, month: 2,  title: 'サーバプロビジョニングのこれまでとこれから', venue: 'Developers Summit 2014', url: 'https://speakerdeck.com/mizzy/future-of-server-provisioning-at-developers-summit-2014', country: 'jp' },
      { year: 2013, month: 11, title: 'サーバプロビジョニングのこれまでとこれから', venue: '週末ランサーズ 第5回', url: 'https://speakerdeck.com/mizzy/future-of-server-provisioning', country: 'jp' },
      { year: 2013, month: 10, title: 'Sqaleでcgroupsにfork bomb対策を入れた話', venue: '第2回 コンテナ型仮想化の情報交換会', url: 'https://speakerdeck.com/mizzy/sqaledecgroupsnifork-bombdui-ce-woru-retahua-at-di-2hui-kontenaxing-jia-xiang-hua-falseqing-bao-jiao-huan-hui-dong-jing', country: 'jp' },
      { year: 2013, month: 7,  title: 'Serverspec', venue: 'JTF 2013', url: 'https://www.slideshare.net/mizzy/serverspec-jtf2013', country: 'jp' },
      { year: 2013, month: 6,  title: 'Serverspec', venue: 'hbstudy #45', url: 'https://www.slideshare.net/mizzy/serverspec-hbstudy45', country: 'jp' },
      { year: 2013, month: 2,  title: 'Maglica - A Simple Internal Cloud Tool', venue: '#techkayac', url: 'https://www.slideshare.net/mizzy/maglica-techkayac', country: 'jp' },
      { year: 2012, month: 12, title: 'Inside Sqale\'s Backend', venue: 'RubyConf Taiwan 2012', url: 'https://www.slideshare.net/mizzy/inside-sqales-backend-at-rubyconf-taiwan-2012', country: 'intl' },
      { year: 2012, month: 9,  title: 'How Perl Changed My Life', venue: 'YAPC::Asia Tokyo 2012', url: 'https://www.slideshare.net/mizzy/how-perl-changed-my-life', country: 'jp' },
      { year: 2012, month: 9,  title: 'Inside Sqale\'s Backend', venue: 'YAPC::Asia Tokyo 2012', url: 'https://www.slideshare.net/mizzy/inside-sqales-backend-at-yapcasia-tokyo-2012', country: 'jp' },
      { year: 2012, month: 9,  title: 'Inside Sqale\'s Backend', venue: 'Sapporo RubyKaigi 2012', url: 'https://www.slideshare.net/mizzy/inside-sqales-backend-at-sapporo-ruby-kaigi-2012', country: 'jp' },
      { year: 2011, month: 6,  title: '10分でわかるDevOps', venue: '第1回 DevOpsカンファレンス', url: 'https://www.slideshare.net/mizzy/10devops', country: 'jp' },
      { year: 2011,            title: 'イベント駆動プログラミングとI/O多重化', venue: 'paperboy&co. 社内勉強会', url: 'https://www.slideshare.net/mizzy/io-18459625', country: 'jp' },
      { year: 2010, month: 5,  title: 'NoSQLに関するまとめ', venue: 'paperboy&co. 社内勉強会', url: 'https://www.slideshare.net/mizzy/no-sql-23136978', country: 'jp' },
      { year: 2010, month: 5,  title: 'DevOpsって何？', venue: 'NTTレゾナント社内勉強会', url: 'https://www.slideshare.net/mizzy/devops-4156440', country: 'jp' },
      { year: 2010, month: 2,  title: 'Puppetのススメ', venue: 'hbstudy #8', url: 'https://www.slideshare.net/mizzy/puppet-3258268', country: 'jp' },
      { year: 2009, month: 12, title: 'Puppet Best Practices?', venue: 'Cookpad 社内勉強会', url: 'https://www.slideshare.net/mizzy/puppet-best-practices-at-cookpad', country: 'jp' },
      { year: 2009, month: 9,  title: 'Danga::Socketの非同期処理の仕組みとPerlbalで非同期処理するプラグインを書く方法', venue: 'YAPC::Asia 2009', url: 'https://www.slideshare.net/mizzy/dangasocketperlbal', country: 'jp' },
      { year: 2008, month: 11, title: 'Operating Xen domains through LL with libvirt', venue: 'Xen Summit Asia 2008', url: 'https://www.slideshare.net/mizzy/xen-summit-2008-tokyo-operating-xen-domains-through-llperlpython-with-libvirt-presentation', country: 'jp' },
      { year: 2008, month: 11, title: '30days Albumの裏側', venue: 'KOF 2008', url: 'https://www.slideshare.net/mizzy/2008-30days-album-presentation', country: 'jp' },
      { year: 2008, month: 9,  title: 'How To Build A Scalable Storage System with OSS', venue: 'Tokyo Linux Users Group', url: 'https://www.slideshare.net/mizzy/how-to-build-a-scalable-storage-system-at-tlug-meeting-20080913-presentation', country: 'jp' },
      { year: 2008, month: 5,  title: 'Easy system administration programming with a framework', venue: 'YAPC::Asia 2008', url: 'https://www.slideshare.net/mizzy/yapcasia-2008-tokyo-easy-system-administration-programming-with-a-framework-by-gosuke-miyashita', country: 'jp' },
      { year: 2008, month: 3,  title: 'Open Source System Administration Framework - Func', venue: '第4回 KLab勉強会', url: 'https://www.slideshare.net/mizzy/open-source-system-administration-framework-func', country: 'jp' },
      { year: 2007, month: 4,  title: 'Assurer - a pluggable server testing/monitoring framework', venue: 'YAPC::Asia 2007', url: 'https://www.slideshare.net/mizzy/assurer-a-pluggable-server-testingmonitoring-framework', country: 'jp' },
    ],
  },
};
