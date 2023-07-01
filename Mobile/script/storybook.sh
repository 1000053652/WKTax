#!/bin/bash

# a basic script, only support following commands
# $0 cleanup  || $0 android || $0 ios || $0 android cleanup || $0 ios cleanup

script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

#change to root dir
cd $script_dir/../

# echo `pwd`
# default ios
platform='ios'
clean_up=0

function ios_cleanup {
     cd ios && USE_HERMES=true pod install && cd ../
}

function android_cleanup {
    if [  -f "android/gradle.properties.orig" ]; then
     mv -f android/gradle.properties.orig android/gradle.properties 
    fi
}

if [ $# -gt 0 ]; then
    if [ $1 = "cleanup" ]; then
        android_cleanup
        ios_cleanup
        exit 0;
    fi
    platform=$1
fi
if [ $# -eq 2 ]; then
    clean_up=1    
fi

if [ $platform = 'ios' ]; then
#ios logic
    if [ $clean_up -eq 1 ]; then
        ios_cleanup
    else
        cd ios && USE_HERMES=false pod install && USE_HERMES=true && cd ../ &&  yarn react-native run-ios --port 8083 --simulator='iPhone 12'
        # use iPhone 12 to avoid colision with default iPhone 13, if RN later change the default, recommend to update the simulator value to higher version
    fi
else
    #android logic
    if [ $clean_up -eq 1 ]; then
       # echo "move file back"
        android_cleanup
    else
        android_cleanup # in case cleanup was not called prior running
        cd android && cp gradle.properties gradle.properties.orig &&  echo "USE_HERMES=false" >>  gradle.properties && cd ../  &&  yarn react-native run-android --port 8083
        android_cleanup
    fi
fi

exit 0;