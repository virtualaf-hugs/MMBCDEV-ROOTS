# Changelog

## 2.4.0 - (2020-02-13)
- Increased width of page content on contact us page so content entered in WISIWYG is the full width of the site.
- Fixed bug where product weight data on PDP was not reflecting variant weights when selected
- Fixed schema markup for description and sku data on the PDP
- Merged changes from Cornerstone v4.4.0 See version comparison here: https://github.com/bigcommerce/cornerstone/compare/4.3.1...4.4.0

## 2.3.0 - (2020-01-21)
- Fixed styles for order confirmation page "See Details" modal on mobile. Previously the content wasn't visible when this modal was triggered.
- Font size of home page product block headings are now controlled by the theme editor setting for h2 elements.
- Fixed product page thumbnail bug where tall narrow images displayed taller than their containing box.
- Merged changes from Cornerstone v4.3.1 See version comparison here: https://github.com/bigcommerce/cornerstone/compare/4.2.1...4.3.1
- Fixed bug with pre-order message displaying as "undefined undefined"

## 2.2.1 - (2019-12-09)
- Removed "Description" heading on product page when no description or videos exist. Previously would always show even when description field was empty.
- Fixed pricing issue where default price wasn't matching the default variant price.
- Removed black background from mobile carousel when no text is added the the slide.
- Scroll to top of option form when action button is clicked. This ensures that any error messages on options are visible.
- Removed height restrictions on carousel slides.

## 2.2.0 - (2019-11-13)
- Merged changes from Cornerstone v4.2.1 See version comparison here: https://github.com/bigcommerce/cornerstone/compare/4.1.0...4.2.1
- Fixed navigation bug where the dropdown would start with a blank column. This would happen if the first subcategory group contained more links than the number set in the theme editor setting for "Number of links per column in dropdowns".
- Fixed bug with product images where main image wouldn't update after selecting an option whose rule changed the main image.
- Show brands in simple list on /brands/ page if no brands have been assigned an image. Previously always showed "image coming soon" even when no brands had an image.

## 2.1.1 - (2019-09-25)
- Hotfix for un-functional add to cart button on mobile product page.

## 2.1.0 - (2019-09-18)
- Fixed social share button links. Previously information parameters weren't being passed properly.
- Reverted to previous lazy load functionality where a spinner is shown while images load instead of a blurry version of the image. 

## 2.0.1 - (2019-09-16)
- Fixed issue where buy block would wrap below product image block (safari specific)
- Added visibility settings for Amazon Pay & Google Pay footer icons
- Added back apple Pay icon to footer - was erroneously removed in last update
- User nav icons now inherit their color from the nav user link setting in the theme editor

## 2.0.0 - (2019-09-11)
- Merged changes from Cornerstone v4.1.0 See version comparison here: https://github.com/bigcommerce/cornerstone/compare/3.2.0...4.1.0
- Fixed issue where buy block would wrap below product image block
- Fixed issue where quantity wouldn't update when manually entered on cart page

## 1.0.5 (2019-09-03)
- Hotfix for product options overlapping product specs on mobile

## 1.0.4 (2019-08-29)
- Hotfix for product page display when using Yotpo reviews. Had been showing Yotpo reviews on same row as product image and buy block causing everything to be squished and unusable. 
- Added theme editor option to control number of recent posts to display on home page. Previously you were unable to remove this section using theme settings.
- Fixed modal display on mobile. Previously the modals would display too low on the screen and the content wouldn't be visible.

## 1.0.3 (2019-08-27)
- Modified default number of blog posts that display per page to 6. This lines up better with the theme structure which displays 3 per row.
- Added store design setting for number of blog posts to display per page so it can be modified by users. 
- Fixed visual bug of card image border caused by last update. 

## 1.0.2 (2019-08-20)
- Adjusted placement of card image border to be attached to image instead of image container
- Fixed social share icon link color on hover. Previously had been set to white, now inherits from general link color and general link hover color. 

## 1.0.1 (2019-08-15)
- Updated support e-mail

## 1.0.0 (2019-08-13)
- First publish ready version of Roots

## 0.1.3 (2019-08-08)
- Updated config.json meta information

## 0.1.2 (2019-07-24)
- Adjusted default logo size
- Fixed 'as uploaded' logo option bug where logo didn't line up with left side of nav

## 0.1.1 (2019-07-9)
- Added theme editor setting for text logo font size on mobile
- Added ellipsis on text logo on mobile to prevent overlap on menu and cart logos
- Fixed logo from getting cut off when "optimized for theme" sizing selected

## 0.1.0 (2019-06-27)
- General testing and refinements
- First official version for review

## 0.0.0
- Initial version of Roots for review
