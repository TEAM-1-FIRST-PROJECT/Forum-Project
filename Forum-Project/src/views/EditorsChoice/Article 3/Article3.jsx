const Article3 = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <main className="mt-10">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              Exploring the Exciting Features of iOS 17
            </h2>
          </div>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            className="w-full object-cover lg:rounded"
            style={{ height: '28em' }}
            alt="iOS 17"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6">
              Apple&apos;s latest operating system, iOS 17, has arrived, bringing a slew of exciting features and improvements. Whether you&apos;re a longtime iOS user or new to the Apple ecosystem, let&apos;s dive into the most interesting additions that iOS 17 has to offer.
            </p>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">1. Augmented Reality Enhancements</h2>
            <p className="pb-6">
              iOS 17 takes augmented reality (AR) to new heights with enhanced capabilities. The AR experiences are more immersive and interactive, providing users with engaging applications and games that seamlessly blend the digital and physical worlds.
            </p>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">2. Focus Mode</h2>
            <p className="pb-6">
              Focus mode is a new feature designed to help users minimize distractions and stay in the zone. Customize Focus modes for different scenarios, such as work or personal time, and enjoy a tailored experience with notifications and app suggestions.
            </p>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">3. Redesigned Control Center</h2>
            <p className="pb-6">
              The Control Center receives a visual overhaul in iOS 17, making it more intuitive and user-friendly. Access your favorite controls with ease and enjoy the streamlined design for quick adjustments to settings like brightness, volume, and connectivity.
            </p>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">4. Live Text in Camera</h2>
            <p className="pb-6">
              Live Text functionality expands to the Camera app, allowing you to interact with text in photos and screenshots. Copy, paste, look up, or translate text directly from your camera viewfinder, adding a new level of convenience to your daily activities.
            </p>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">5. Enhanced Privacy Features</h2>
            <p className="pb-6">
              Privacy remains a top priority for Apple, and iOS 17 introduces new features to enhance user control. The Mail app, for instance, includes Mail Privacy Protection, preventing senders from knowing when an email is opened and blocking tracking pixels.
            </p>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">Conclusion</h2>
            <p className="pb-6">
              iOS 17 is a significant update that brings a range of new features and improvements, enhancing the overall user experience. From augmented reality advancements to privacy-focused innovations, Apple continues to push the boundaries of what&apos;s possible in the mobile operating system landscape.
            </p>
            <p>
              Stay tuned for further updates and enjoy exploring the latest features that iOS 17 has to offer on your compatible Apple devices!
            </p>
          </div>
          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  className="h-10 w-10 rounded-full mr-2 object-cover" />
                <div>
                  <p className="font-semibold text-gray-700 text-sm">Plamen Milanov</p>
                  <p className="font-semibold text-gray-600 text-xs">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Article3;
