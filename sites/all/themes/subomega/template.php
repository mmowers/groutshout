<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

function subomega_preprocess_html(&$variables,$hook) {
  $path = drupal_get_destination();
  $path_cur = current_path();
  $request_path = request_path();
  $path_components = explode('/', $path_cur);
  if($path_cur =='posts'){
    drupal_add_css(path_to_theme() . '/css/posts.css', array('weight' => CSS_THEME));
    drupal_add_js(path_to_theme() . '/js/posts.js',array('type' => 'file', 'weight' => 100, 'group' => JS_THEME));
    drupal_add_js("http://maps.google.com/maps/api/js?libraries=geometry&sensor=false");
    //Add to home screen stuff
    drupal_add_css(path_to_theme() . '/css/add2home.css', array('weight' => CSS_THEME));
    drupal_add_js(path_to_theme() . '/js/add2home_add.js',array('type' => 'file', 'weight' => 99, 'group' => JS_THEME));
    drupal_add_js(path_to_theme() . '/js/add2home.js',array('type' => 'file', 'weight' => 100, 'group' => JS_THEME));
    //$meta_add2home = array('#type' => 'html_tag','#tag' => 'meta','#attributes' => array('name' =>  'apple-mobile-web-app-capable', 'content'=>'yes'), '#weight' => '-99999');
    //drupal_add_html_head($meta_add2home, 'meta_add2home');
  }
  elseif($path_cur =='node/add/post'){
    drupal_add_css(path_to_theme() . '/css/newpost.css', array('weight' => CSS_THEME));
    drupal_add_js(path_to_theme() . '/js/newpost.js',array('type' => 'file', 'weight' => 100, 'group' => JS_THEME));    
  }
}

/**
 * Implement hook_form_user_register_form_alter().
 * 
 * Idea to use this was from logintoboggan_form_user_register_form_alter. For some
 * reason it seems my custom module doesn't see this as a form???
 */
function subomega_form_user_register_form_alter(&$form, &$form_state) {
  //$form['account']['name']['#title'] = t('Full Name');
  //$form['account']['name']['#description'] = t('Your name as you and others will see it.');
  $form['account']['mail']['#description'] = t('A valid e-mail address.');
  //$form['account']['mail']['#description'] = t('A valid Stanford e-mail address.');
  //$form['#validate'][] = 'user_register_stanford_validate';
}

/*function user_register_stanford_validate($form, &$form_state){
  $email_array = explode('@',$form_state['values']['mail']);
  if(drupal_strtolower($email_array[1]) != 'stanford.edu'){
//  if(drupal_strtolower($email_array[1]) != 'stanford.edu' && drupal_strtolower($email_array[1]) != 'stanfordalumni.org'){
    form_set_error('mail', t('You must enter a valid Stanford email address.'));
    return;
  }
}*/
