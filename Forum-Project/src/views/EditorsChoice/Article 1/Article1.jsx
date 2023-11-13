
const Article1 = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <main className="mt-10">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              A Step-by-Step Guide to Switching from Android to iPhone
            </h2>
            <a
              href="#"
              className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            >
              FAQs
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            className="w-full object-cover lg:rounded"
            style={{ height: '28em' }}
            alt=""
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6">
              Making the switch from Android to iPhone can be an exciting but daunting experience, especially when it comes to transferring all your data seamlessly. Fortunately, with the right tools and a bit of know-how, you can make the transition effortlessly. In this guide, we&apos;ll walk you through the steps to ensure a smooth switch from your Android device to your shiny new iPhone.
            </p>
            <p className="pb-6 font-semibold">Step 1: Prepare Your Android Device</p>
            <p>
              Before you begin the migration process, it&apos;s crucial to prepare your Android device. Start by ensuring that your contacts, photos, and other important data are backed up to your Google account. Most Android devices automatically sync data with your Google account, making it easier to retrieve on your new iPhone.
            </p>
            <p className="pb-6 font-semibold">Step 2: Set Up Your iPhone</p>
            <p>
              Once your Android device is backed up, it&apos;s time to set up your iPhone. Turn on your new iPhone and follow the on-screen instructions to connect to Wi-Fi, sign in with your Apple ID, and set up other preferences.
            </p>
            <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
              <p className="font-semibold">Step 3: Use the &apos;Move to iOS&apos; App</p>
              <p>
                Apple has developed a handy app called &apos;Move to iOS&apos; to simplify the transition process. Download and install the app on your Android device from the Google Play Store. Follow the on-screen instructions, and when prompted, enter the unique code displayed on your iPhone. The &apos;Move to iOS&apos; app will transfer your contacts, message history, photos, videos, web bookmarks, and more from your Android device to your iPhone. This process ensures that your essential data makes the journey seamlessly.
              </p>
            </div>
            <p className="pb-6 font-semibold">Step 4: Transfer Contacts </p>
            <p>
              If you prefer a more manual approach for transferring contacts, you can use cloud services like Google Contacts. Ensure that your contacts are synced to your Google account on your Android device. On your iPhone, go to Settings - Contacts - Accounts - Add Account, and select Google. Sign in with the same Google account used on your Android device, and your contacts will be synced to your iPhone.
            </p>
            <p className="pb-6 font-semibold">Step 5: Move Photos and Videos</p>
            <p>
              To transfer photos and videos, you can use cloud services like Google Photos or Apple&apos;s iCloud. On your Android device, upload your photos and videos to Google Photos. Then, on your iPhone, download the Google Photos app, sign in with your Google account, and access your media files. Alternatively, you can connect both devices to your computer and manually transfer photos and videos.
            </p>
            <p className="pb-6 font-semibold">Step 6: Re-download Apps and Content</p>
            <p>
              While the &apos;Move to iOS&apos; app can transfer some of your apps, you&apos;ll likely need to re-download others manually. Visit the App Store on your iPhone, search for your favorite apps, and download them. Additionally, sign in to your accounts within the apps to retrieve your content and settings.
            </p>
            <p className="pb-6">
              Switching from Android to iPhone may seem like a complex process, but with these step-by-step instructions, you can ensure a smooth transition while preserving your essential data. Whether you choose to use the &apos;Move to iOS&apos; app or opt for manual methods, embracing your new iPhone has never been easier. Enjoy exploring the seamless integration of hardware and software that Apple has to offer!
            </p>
            <p>
              Detract yet delight written farther his general. If in so bred at dare rose lose good. Feel and make two real miss use easy. Celebrated delightful an especially increasing instrument am. Indulgence contrasted sufficient to unpleasant in in insensible favourable. Latter remark hunted enough vulgar say man. Sitting hearted on it without me.
            </p>
          </div>
          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-10 w-10 rounded-full mr-2 object-cover" />
                <div>
                  <p className="font-semibold text-gray-700 text-sm"> Lyuba boyadzhieva </p>
                  <p className="font-semibold text-gray-600 text-xs"> Admin </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Article1;
