export const languageOptions = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-Hans', label: '简体中文' },
  { code: 'zh-Hant', label: '繁體中文' },
] as const;

export type LicenseLanguage = typeof languageOptions[number]['code'];

interface Rule {
  text: string;
  detail?: string;
}

interface LicenseContent {
  title: string;
  description: string;
  home: string;
  language: string;
  freeTitle: string;
  freeDescription: string;
  mitLink: string;
  paidTitle: string;
  paidDescription: string;
  allowedTitle: string;
  prohibitedTitle: string;
  allowed: Rule[];
  prohibited: Rule[];
  exceptions: string;
}

export const licenseContent: Record<LicenseLanguage, LicenseContent> = {
  ko: {
    title: '라이선스',
    description: '자유롭게 사용하는 대신, 원작자의 권리만 존중해주세요.',
    home: '홈으로',
    language: '언어 선택',
    freeTitle: '무료 에셋',
    freeDescription: '무료로 다운로드할 수 있는 에셋에는 MIT 라이선스를 적용합니다. 저작권 표시와 라이선스 고지를 유지하면 수정, 재배포 및 판매할 수 있습니다. 아래 유료 에셋의 재배포 제한은 적용되지 않습니다.',
    mitLink: 'MIT 라이선스 전문',
    paidTitle: '유료 에셋',
    paidDescription: '구매한 에셋은 아래 조건에 따라 자유롭게 활용할 수 있습니다.',
    allowedTitle: '허용',
    prohibitedTitle: '금지',
    allowed: [
      { text: '개인 및 상업적 이용' },
      { text: '소스 코드 및 에셋의 수정과 개조' },
      { text: 'AI 도구를 이용한 분석, 수정, 생성 및 개발' },
      { text: '다른 프로젝트 개발에 일부 또는 전체 활용' },
      { text: '본 에셋을 포함한 게임, 앱, VRChat 월드 등 완성된 결과물의 배포 및 판매' },
      { text: '본 에셋을 포함한 다른 에셋 또는 상품의 판매', detail: '단, 해당 상품에서 본 에셋이 차지하는 비중이 극히 미미하며, 본 에셋 자체가 상품의 주된 가치나 구매 목적이 아닌 경우에 한합니다. 450엔에 판매된 에셋의 경우, 4500엔 이상의 에셋에는 포함하여 판매할 수 있습니다.' },
      { text: '팀 작업에 필요한 범위 내에서 공동 작업자와 공유' },
      { text: '구매자끼리에 한해 수정된 버전 공유', detail: '퍼블릭 공개 시에는 원본이 없으면 작동하지 않도록 배포해야 합니다.' },
    ],
    prohibited: [
      { text: '원본 에셋의 재배포 및 재판매' },
      { text: '본 에셋 또는 그 수정본 자체를 주된 가치로 하는 상품의 판매' },
    ],
    exceptions: '위에서 허용한 공동 작업자와의 공유, 구매자 간 수정본 공유, 원본이 없으면 작동하지 않는 공개 배포는 재배포 금지의 예외입니다.',
  },
  en: {
    title: 'License',
    description: 'Use it freely; just respect the original creator\'s rights.',
    home: 'Home',
    language: 'Choose a language',
    freeTitle: 'Free assets',
    freeDescription: 'Assets available to download for free use the MIT License. You may modify, redistribute, and sell them as long as you retain the copyright and license notices. The redistribution restrictions for paid assets below do not apply.',
    mitLink: 'Read the MIT License',
    paidTitle: 'Paid assets',
    paidDescription: 'You may freely use purchased assets under the following terms.',
    allowedTitle: 'Allowed',
    prohibitedTitle: 'Prohibited',
    allowed: [
      { text: 'Personal and commercial use' },
      { text: 'Modification and customization of source code and assets' },
      { text: 'Analysis, modification, generation, and development using AI tools' },
      { text: 'Use of part or all of the asset to develop other projects' },
      { text: 'Distribution and sale of finished works containing the asset, such as games, apps, and VRChat worlds' },
      { text: 'Sale of other assets or products containing this asset', detail: 'Only if this asset accounts for an extremely small portion of the product and is neither its main value nor the reason for purchasing it. An asset sold for ¥450 may be included in an asset sold for ¥4,500 or more.' },
      { text: 'Sharing with collaborators to the extent necessary for teamwork' },
      { text: 'Sharing modified versions exclusively among purchasers', detail: 'Publicly shared versions must be distributed so that they cannot work without the original asset.' },
    ],
    prohibited: [
      { text: 'Redistribution or resale of the original asset' },
      { text: 'Sale of products whose main value is this asset itself or a modified version of it' },
    ],
    exceptions: 'The permitted sharing with collaborators, sharing of modified versions among purchasers, and public distribution that cannot work without the original asset are exceptions to the redistribution prohibition.',
  },
  ja: {
    title: 'ライセンス',
    description: '自由に使っていただく代わりに、原作者の権利だけは尊重してください。',
    home: 'ホームへ',
    language: '言語を選択',
    freeTitle: '無料アセット',
    freeDescription: '無料でダウンロードできるアセットにはMITライセンスを適用します。著作権表示とライセンス表記を保持すれば、改変・再配布・販売が可能です。以下の有料アセットに関する再配布制限は適用されません。',
    mitLink: 'MITライセンス全文',
    paidTitle: '有料アセット',
    paidDescription: '購入したアセットは、以下の条件に従って自由に活用できます。',
    allowedTitle: '許可',
    prohibitedTitle: '禁止',
    allowed: [
      { text: '個人利用および商用利用' },
      { text: 'ソースコードおよびアセットの修正・改変' },
      { text: 'AIツールを用いた分析・修正・生成・開発' },
      { text: '他のプロジェクトの開発に一部または全部を活用' },
      { text: '本アセットを含むゲーム・アプリ・VRChatワールドなど、完成した成果物の配布・販売' },
      { text: '本アセットを含む他のアセットまたは商品の販売', detail: 'ただし、商品に占める本アセットの割合が極めて小さく、本アセット自体が商品の主な価値や購入目的ではない場合に限ります。450円で販売されたアセットは、4,500円以上で販売するアセットに含めて販売できます。' },
      { text: 'チーム作業に必要な範囲で共同作業者と共有' },
      { text: '購入者同士に限った改変版の共有', detail: '一般公開する場合は、元のアセットがなければ動作しない形で配布してください。' },
    ],
    prohibited: [
      { text: '元のアセットの再配布・再販売' },
      { text: '本アセットまたはその改変版自体を主な価値とする商品の販売' },
    ],
    exceptions: '上記で許可した共同作業者との共有、購入者間での改変版の共有、および元のアセットなしでは動作しない一般公開の配布は、再配布禁止の例外です。',
  },
  'zh-Hans': {
    title: '许可协议',
    description: '你可以自由使用，只需尊重原作者的权利。',
    home: '返回首页',
    language: '选择语言',
    freeTitle: '免费资源',
    freeDescription: '可免费下载的资源采用MIT许可证。只要保留版权声明和许可声明，就可以修改、再分发及销售。以下针对付费资源的再分发限制不适用。',
    mitLink: '阅读MIT许可证全文',
    paidTitle: '付费资源',
    paidDescription: '购买后的资源可按以下条款自由使用。',
    allowedTitle: '允许',
    prohibitedTitle: '禁止',
    allowed: [
      { text: '个人及商业用途' },
      { text: '修改及改造源代码与资源' },
      { text: '使用AI工具进行分析、修改、生成及开发' },
      { text: '将部分或全部资源用于开发其他项目' },
      { text: '分发及销售包含本资源的完整成果，如游戏、应用、VRChat世界等' },
      { text: '销售包含本资源的其他资源或商品', detail: '仅限本资源在该商品中所占比例极其微小，且本资源本身并非商品的主要价值或购买目的的情况。售价为450日元的资源，可以包含在售价为4,500日元或以上的资源中销售。' },
      { text: '在团队协作所需的范围内与共同创作者共享' },
      { text: '仅在购买者之间共享修改后的版本', detail: '公开发布时，必须以没有原始资源就无法运行的形式分发。' },
    ],
    prohibited: [
      { text: '再分发或转售原始资源' },
      { text: '销售以本资源或其修改版本身为主要价值的商品' },
    ],
    exceptions: '上述允许的与共同创作者共享、购买者之间共享修改版，以及没有原始资源就无法运行的公开分发，均属于再分发禁令的例外。',
  },
  'zh-Hant': {
    title: '授權條款',
    description: '你可以自由使用，只需尊重原作者的權利。',
    home: '返回首頁',
    language: '選擇語言',
    freeTitle: '免費資源',
    freeDescription: '可免費下載的資源採用MIT授權。只要保留著作權聲明和授權聲明，就可以修改、重新散布及販售。以下針對付費資源的重新散布限制不適用。',
    mitLink: '閱讀MIT授權全文',
    paidTitle: '付費資源',
    paidDescription: '購買後的資源可依照以下條款自由使用。',
    allowedTitle: '允許',
    prohibitedTitle: '禁止',
    allowed: [
      { text: '個人及商業用途' },
      { text: '修改及改造原始碼與資源' },
      { text: '使用AI工具進行分析、修改、生成及開發' },
      { text: '將部分或全部資源用於開發其他專案' },
      { text: '散布及販售包含本資源的完整成果，如遊戲、應用程式、VRChat世界等' },
      { text: '販售包含本資源的其他資源或商品', detail: '僅限本資源在該商品中所占比例極其微小，且本資源本身並非商品的主要價值或購買目的的情況。售價為450日圓的資源，可以包含在售價為4,500日圓或以上的資源中販售。' },
      { text: '在團隊協作所需的範圍內與共同創作者分享' },
      { text: '僅在購買者之間分享修改後的版本', detail: '公開發布時，必須以沒有原始資源就無法運作的形式散布。' },
    ],
    prohibited: [
      { text: '重新散布或轉售原始資源' },
      { text: '販售以本資源或其修改版本身為主要價值的商品' },
    ],
    exceptions: '上述允許的與共同創作者分享、購買者之間分享修改版，以及沒有原始資源就無法運作的公開散布，均屬於重新散布禁令的例外。',
  },
};

export function isLicenseLanguage(value: string | null): value is LicenseLanguage {
  return languageOptions.some(option => option.code === value);
}

export function detectLicenseLanguage(languages: readonly string[]): LicenseLanguage {
  for (const language of languages) {
    const locale = language.toLowerCase();
    if (locale === 'ko' || locale.startsWith('ko-')) return 'ko';
    if (locale === 'ja' || locale.startsWith('ja-')) return 'ja';
    if (locale === 'zh' || locale.startsWith('zh-')) {
      return /(?:^|-)hant(?:-|$)|(?:^|-)(?:tw|hk|mo)(?:-|$)/.test(locale) ? 'zh-Hant' : 'zh-Hans';
    }
    if (locale === 'en' || locale.startsWith('en-')) return 'en';
  }
  return 'en';
}
