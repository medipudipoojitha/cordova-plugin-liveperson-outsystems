//
//  UIColor+LP.swift
//  LinhTinhSwift
//
//  Created by Hoan Nguyen on 7/1/20.
//  Copyright © 2020 Hoan Nguyen. All rights reserved.
//

import Foundation
import UIKit

extension UIColor{
    
    static let backgroundColor = UIColor(hex: "#FFFFFF", true)

    static let conversationBackgroundColor = UIColor(hex: "#FFFFFF", true)

    static let remoteUserBubbleBackgroundColor = UIColor(hex: "#CAD1D6", true)
    static let remoteUserBubbleBorderColor = UIColor(hex: "#CAD1D6", true)
    static let remoteUserBubbleLinkColor = UIColor(hex: "#152B55", true)
    static let remoteUserBubbleTextColor = UIColor(hex: "#636363", true)
    static let remoteUserBubbleTimestampColor = UIColor(hex: "##767676", true)
    static let remoteUserTypingTintColor = UIColor(hex: "#636363", true)
    static let remoteUserBubbleLongPressOverlayColor = UIColor(hex: "#C1C1C1", true)

    static let userBubbleBackgroundColor = UIColor(hex: "#54606C", true)
    static let userBubbleBorderColor = UIColor(hex: "#54606C", true)
    static let userBubbleLinkColor = UIColor(hex: "#FFFFFF", true)
    static let userBubbleTextColor = UIColor(hex: "#FFFFFF", true)
    static let userBubbleTimestampColor = UIColor(hex: "##767676", true)
    static let userBubbleSendStatusTextColor = UIColor(hex: "#D7D8D6", true)
    static let userBubbleErrorTextColor = UIColor(hex: "#DB0011", true)
    static let userBubbleErrorBorderColor = UIColor(hex: "#DB0011", true)
    static let userBubbleLongPressOverlayColor = UIColor(hex: "#F5F5F5", true)

    static let linkPreviewBackgroundColor = UIColor(hex: "#152B55", true)
    static let linkPreviewTitleTextColor = UIColor(hex: "#FFFFFF", true)
    static let linkPreviewDescriptionTextColor = UIColor(hex: "#F5F5F5", true)
    static let linkPreviewSiteNameTextColor = UIColor(hex: "#767676", true)

    static let urlRealTimePreviewBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let urlRealTimePreviewBorderColor = UIColor(hex: "#C1C1C1", true)

    static let urlRealTimePreviewTitleTextColor = UIColor(hex: "#767676", true)
    static let urlRealTimePreviewDescriptionTextColor = UIColor(hex: "#767676", true)

    static let photosharingMenuBackgroundColor = UIColor(hex: "#152B55", true)
    static let photosharingMenuButtonsBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let photosharingMenuButtonsTintColor = UIColor(hex: "#152B55", true)
    static let photosharingMenuButtonsTextColor = UIColor(hex: "#FFFFFF", true)
    static let cameraButtonEnabledColor = UIColor(hex: "#152B55", true)
    static let cameraButtonDisabledColor = UIColor(hex: "#F5F5F5", true)
    static let fileCellLoaderFillColor = UIColor(hex: "#00CA3D", true)
    static let fileCellLoaderRingProgressColor = UIColor(hex: "#00CA3D", true)
    static let fileCellLoaderRingBackgroundColor = UIColor(hex: "#FFFFFF", true)


    static let sendButtonDisabledColor = UIColor(hex: "#F5F5F5", true)
    static let sendButtonEnabledColor = UIColor(hex: "#152B55", true)
    static let systemBubbleTextColor = UIColor(hex: "#1C1C1C", true)

    static let checkmarkReadColor = UIColor(hex: "#767676", true)
    static let checkmarkDistributedColor = UIColor(hex: "#767676", true)
    static let checkmarkSentColor = UIColor(hex: "#767676", true)

    static let csatSubmitButtonBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let csatSubmitButtonTextColor = UIColor(hex: "#000000", true)
    static let csatRatingButtonSelectedColor = UIColor(hex: "#FFFFFF", true)
    static let csatAllTitlesTextColor = UIColor(hex: "#000000", true)

    static let csatNavigationBackgroundColor = UIColor(hex: "#152B55", true)
    static let csatNavigationTitleColor = UIColor(hex: "#000000", true)
    static let csatSkipButtonColor = UIColor(hex: "#000000", true)
    static let conversationSeparatorTextColor = UIColor(hex: "#163049", true)

    static let dateSeparatorTitleBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let dateSeparatorTextColor = UIColor(hex: "#636363", true)
    static let dateSeparatorLineBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let dateSeparatorBackgroundColor = UIColor(hex: "#FFFFFF", true)

    static let inputTextViewContainerBackgroundColor = UIColor(hex: "#F5F5F5", true)

    static let ttrBannerBackgroundColor = UIColor(hex: "#636363", true)
    static let ttrBannerTextColor = UIColor(hex: "#FFFFFF", true)

    static let remoteUserAvatarBackgroundColor = UIColor(hex: "#D7D8D6", true)
    static let remoteUserAvatarIconColor = UIColor(hex: "#000000", true)
    static let csatAgentAvatarBackgroundColor = UIColor(hex: "#D7D8D6", true)
    static let csatAgentAvatarIconColor = UIColor(hex: "#000000", true)

    static let conversationNavigationBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let conversationNavigationTitleColor = UIColor(hex: "#000000", true)
    static let secureFormBackButtonColor = UIColor(hex: "#000000", true)

    static let secureFormNavigationBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let secureFormNavigationTitleColor = UIColor(hex: "#000000", true)
    static let secureFormBubbleBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let secureFormBubbleBorderColor = UIColor(hex: "#D7D8D6", true)
    static let secureFormBubbleTitleColor = UIColor(hex: "#D7D8D6", true)
    static let secureFormBubbleDescriptionColor = UIColor(hex: "#767676", true)
    static let secureFormBubbleFillFormButtonTextColor = UIColor(hex: "#767676", true)
    static let secureFormBubbleFillFormButtonBackgroundColor = UIColor(hex: "#FFFFFF", true)
    static let secureFormBubbleFormImageTintColor = UIColor(hex: "#152B55", true)

    static let connectionStatusConnectingBackgroundColor = UIColor(hex: "#D7D8D6", true)
    static let connectionStatusConnectingTextColor = UIColor(hex: "#636363", true)
    static let connectionStatusFailedToConnectBackgroundColor = UIColor(hex: "#D7D8D6", true)
    static let connectionStatusFailedToConnectTextColor = UIColor(hex: "#152B55", true)
    static let controllerBubbleTextColor = UIColor(hex: "#000000", true)
}



extension UIColor {
     convenience init(hex: String, isUI: Bool) {
           var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
           hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")

           var rgb: UInt32 = 0

           var r: CGFloat = 0.0
           var g: CGFloat = 0.0
           var b: CGFloat = 0.0
           var a: CGFloat = 1.0

           let length = hexSanitized.count

        Scanner(string: hexSanitized).scanHexInt32(&rgb)

           if length == 6 {
               r = CGFloat((rgb & 0xFF0000) >> 16) / 255.0
               g = CGFloat((rgb & 0x00FF00) >> 8) / 255.0
               b = CGFloat(rgb & 0x0000FF) / 255.0

           } else if length == 8 {
               r = CGFloat((rgb & 0xFF000000) >> 24) / 255.0
               g = CGFloat((rgb & 0x00FF0000) >> 16) / 255.0
               b = CGFloat((rgb & 0x0000FF00) >> 8) / 255.0
               a = CGFloat(rgb & 0x000000FF) / 255.0

           }

           self.init(red: r, green: g, blue: b, alpha: a)
       }
       static var customAccent: UIColor {
        if #available(iOS 13, *) {
            return UIColor { (traitCollection: UITraitCollection) -> UIColor in
                if traitCollection.userInterfaceStyle == .dark {
                    return UIColor.black
                } else {
                    return UIColor.white
                }
            }
        } else {
            return UIColor.white
        }
    }
}
