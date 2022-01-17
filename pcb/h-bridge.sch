<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE eagle SYSTEM "eagle.dtd">
<eagle version="9.6.2">
<drawing>
<settings>
<setting alwaysvectorfont="no"/>
<setting verticaltext="up"/>
</settings>
<grid distance="0.1" unitdist="inch" unit="inch" style="lines" multiple="1" display="no" altdistance="0.01" altunitdist="inch" altunit="inch"/>
<layers>
<layer number="1" name="Top" color="4" fill="1" visible="no" active="no"/>
<layer number="2" name="Route2" color="1" fill="3" visible="no" active="no"/>
<layer number="3" name="Route3" color="4" fill="3" visible="no" active="no"/>
<layer number="4" name="Route4" color="1" fill="4" visible="no" active="no"/>
<layer number="5" name="Route5" color="4" fill="4" visible="no" active="no"/>
<layer number="6" name="Route6" color="1" fill="8" visible="no" active="no"/>
<layer number="7" name="Route7" color="4" fill="8" visible="no" active="no"/>
<layer number="8" name="Route8" color="1" fill="2" visible="no" active="no"/>
<layer number="9" name="Route9" color="4" fill="2" visible="no" active="no"/>
<layer number="10" name="Route10" color="1" fill="7" visible="no" active="no"/>
<layer number="11" name="Route11" color="4" fill="7" visible="no" active="no"/>
<layer number="12" name="Route12" color="1" fill="5" visible="no" active="no"/>
<layer number="13" name="Route13" color="4" fill="5" visible="no" active="no"/>
<layer number="14" name="Route14" color="1" fill="6" visible="no" active="no"/>
<layer number="15" name="Route15" color="4" fill="6" visible="no" active="no"/>
<layer number="16" name="Bottom" color="1" fill="1" visible="no" active="no"/>
<layer number="17" name="Pads" color="2" fill="1" visible="no" active="no"/>
<layer number="18" name="Vias" color="2" fill="1" visible="no" active="no"/>
<layer number="19" name="Unrouted" color="6" fill="1" visible="no" active="no"/>
<layer number="20" name="Dimension" color="15" fill="1" visible="no" active="no"/>
<layer number="21" name="tPlace" color="7" fill="1" visible="no" active="no"/>
<layer number="22" name="bPlace" color="7" fill="1" visible="no" active="no"/>
<layer number="23" name="tOrigins" color="15" fill="1" visible="no" active="no"/>
<layer number="24" name="bOrigins" color="15" fill="1" visible="no" active="no"/>
<layer number="25" name="tNames" color="7" fill="1" visible="no" active="no"/>
<layer number="26" name="bNames" color="7" fill="1" visible="no" active="no"/>
<layer number="27" name="tValues" color="7" fill="1" visible="no" active="no"/>
<layer number="28" name="bValues" color="7" fill="1" visible="no" active="no"/>
<layer number="29" name="tStop" color="7" fill="3" visible="no" active="no"/>
<layer number="30" name="bStop" color="7" fill="6" visible="no" active="no"/>
<layer number="31" name="tCream" color="7" fill="4" visible="no" active="no"/>
<layer number="32" name="bCream" color="7" fill="5" visible="no" active="no"/>
<layer number="33" name="tFinish" color="6" fill="3" visible="no" active="no"/>
<layer number="34" name="bFinish" color="6" fill="6" visible="no" active="no"/>
<layer number="35" name="tGlue" color="7" fill="4" visible="no" active="no"/>
<layer number="36" name="bGlue" color="7" fill="5" visible="no" active="no"/>
<layer number="37" name="tTest" color="7" fill="1" visible="no" active="no"/>
<layer number="38" name="bTest" color="7" fill="1" visible="no" active="no"/>
<layer number="39" name="tKeepout" color="4" fill="11" visible="no" active="no"/>
<layer number="40" name="bKeepout" color="1" fill="11" visible="no" active="no"/>
<layer number="41" name="tRestrict" color="4" fill="10" visible="no" active="no"/>
<layer number="42" name="bRestrict" color="1" fill="10" visible="no" active="no"/>
<layer number="43" name="vRestrict" color="2" fill="10" visible="no" active="no"/>
<layer number="44" name="Drills" color="7" fill="1" visible="no" active="no"/>
<layer number="45" name="Holes" color="7" fill="1" visible="no" active="no"/>
<layer number="46" name="Milling" color="3" fill="1" visible="no" active="no"/>
<layer number="47" name="Measures" color="7" fill="1" visible="no" active="no"/>
<layer number="48" name="Document" color="7" fill="1" visible="no" active="no"/>
<layer number="49" name="Reference" color="7" fill="1" visible="no" active="no"/>
<layer number="51" name="tDocu" color="7" fill="1" visible="no" active="no"/>
<layer number="52" name="bDocu" color="7" fill="1" visible="no" active="no"/>
<layer number="88" name="SimResults" color="9" fill="1" visible="yes" active="yes"/>
<layer number="89" name="SimProbes" color="9" fill="1" visible="yes" active="yes"/>
<layer number="90" name="Modules" color="5" fill="1" visible="yes" active="yes"/>
<layer number="91" name="Nets" color="2" fill="1" visible="yes" active="yes"/>
<layer number="92" name="Busses" color="1" fill="1" visible="yes" active="yes"/>
<layer number="93" name="Pins" color="2" fill="1" visible="no" active="yes"/>
<layer number="94" name="Symbols" color="4" fill="1" visible="yes" active="yes"/>
<layer number="95" name="Names" color="7" fill="1" visible="yes" active="yes"/>
<layer number="96" name="Values" color="7" fill="1" visible="yes" active="yes"/>
<layer number="97" name="Info" color="7" fill="1" visible="yes" active="yes"/>
<layer number="98" name="Guide" color="6" fill="1" visible="yes" active="yes"/>
</layers>
<schematic xreflabel="%F%N/%S.%C%R" xrefpart="/%S.%C%R">
<libraries>
<library name="ESP32-S2-WROOM">
<packages>
<package name="XCVR_ESP32-S2-WROOM">
<description>ESP32-S2-WROOM and ESP32-S2-WROOM-I

(Drawn by Dave Williams | G8PUO | DitroniX)</description>
<text x="-9" y="15.9" size="1.27" layer="25">&gt;NAME</text>
<text x="-9" y="-17.7" size="1.2738" layer="27">&gt;VALUE</text>
<wire x1="-9" y1="15.5" x2="9" y2="15.5" width="0.127" layer="51"/>
<wire x1="9" y1="15.5" x2="9" y2="9.2" width="0.127" layer="51"/>
<wire x1="9" y1="9.2" x2="9" y2="-15.5" width="0.127" layer="51"/>
<wire x1="9" y1="-15.5" x2="-9" y2="-15.5" width="0.127" layer="51"/>
<wire x1="-9" y1="-15.5" x2="-9" y2="15.5" width="0.127" layer="51"/>
<wire x1="-8.96" y1="9.2" x2="9" y2="9.2" width="0.127" layer="51"/>
<text x="-4.45471875" y="12.1707" size="1.27" layer="51">ANTENNA</text>
<wire x1="-9.75" y1="-16.28" x2="-9.75" y2="15.75" width="0.05" layer="39"/>
<wire x1="-9.75" y1="15.75" x2="9.75" y2="15.75" width="0.05" layer="39"/>
<wire x1="9.75" y1="15.75" x2="9.75" y2="-16.28" width="0.05" layer="39"/>
<wire x1="-9.75" y1="-16.28" x2="9.75" y2="-16.28" width="0.05" layer="39"/>
<circle x="-10.177" y="7.788" radius="0.1" width="0.3" layer="51"/>
<wire x1="-9" y1="15.5" x2="9" y2="15.5" width="0.127" layer="21"/>
<wire x1="9" y1="15.5" x2="9" y2="9.2" width="0.127" layer="21"/>
<wire x1="-9" y1="8.77" x2="-9" y2="15.5" width="0.127" layer="21"/>
<wire x1="-8.96" y1="9.2" x2="9" y2="9.2" width="0.127" layer="21"/>
<circle x="-10.177" y="7.788" radius="0.1" width="0.3" layer="21"/>
<wire x1="9" y1="9.2" x2="9" y2="8.77" width="0.127" layer="21"/>
<wire x1="-9" y1="-15.27" x2="-9" y2="-15.5" width="0.127" layer="21"/>
<wire x1="-9" y1="-15.5" x2="-7.52" y2="-15.5" width="0.127" layer="21"/>
<wire x1="9" y1="-15.27" x2="9" y2="-15.5" width="0.127" layer="21"/>
<wire x1="9" y1="-15.5" x2="7.52" y2="-15.5" width="0.127" layer="21"/>
<rectangle x1="-9" y1="9.2" x2="9" y2="15.5" layer="41"/>
<rectangle x1="-9" y1="9.2" x2="9" y2="15.5" layer="42"/>
<rectangle x1="-9" y1="9.2" x2="9" y2="15.5" layer="43"/>
<smd name="43.1" x="-1.19" y="-0.05" dx="1.1" dy="1.1" layer="1"/>
<smd name="1" x="-8.75" y="8" dx="1.5" dy="0.9" layer="1"/>
<smd name="2" x="-8.75" y="6.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="3" x="-8.75" y="5" dx="1.5" dy="0.9" layer="1"/>
<smd name="4" x="-8.75" y="3.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="5" x="-8.75" y="2" dx="1.5" dy="0.9" layer="1"/>
<smd name="6" x="-8.75" y="0.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="7" x="-8.75" y="-1" dx="1.5" dy="0.9" layer="1"/>
<smd name="8" x="-8.75" y="-2.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="9" x="-8.75" y="-4" dx="1.5" dy="0.9" layer="1"/>
<smd name="10" x="-8.75" y="-5.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="11" x="-8.75" y="-7" dx="1.5" dy="0.9" layer="1"/>
<smd name="12" x="-8.75" y="-8.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="13" x="-8.75" y="-10" dx="1.5" dy="0.9" layer="1"/>
<smd name="14" x="-8.75" y="-11.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="15" x="-8.75" y="-13" dx="1.5" dy="0.9" layer="1"/>
<smd name="16" x="-8.75" y="-14.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="42" x="8.75" y="8" dx="1.5" dy="0.9" layer="1"/>
<smd name="41" x="8.75" y="6.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="40" x="8.75" y="5" dx="1.5" dy="0.9" layer="1"/>
<smd name="39" x="8.75" y="3.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="38" x="8.75" y="2" dx="1.5" dy="0.9" layer="1"/>
<smd name="37" x="8.75" y="0.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="36" x="8.75" y="-1" dx="1.5" dy="0.9" layer="1"/>
<smd name="35" x="8.75" y="-2.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="34" x="8.75" y="-4" dx="1.5" dy="0.9" layer="1"/>
<smd name="33" x="8.75" y="-5.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="32" x="8.75" y="-7" dx="1.5" dy="0.9" layer="1"/>
<smd name="31" x="8.75" y="-8.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="30" x="8.75" y="-10" dx="1.5" dy="0.9" layer="1"/>
<smd name="29" x="8.75" y="-11.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="28" x="8.75" y="-13" dx="1.5" dy="0.9" layer="1"/>
<smd name="27" x="8.75" y="-14.5" dx="1.5" dy="0.9" layer="1"/>
<smd name="17" x="-6.75" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="18" x="-5.25" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="19" x="-3.75" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="20" x="-2.25" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="21" x="-0.75" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="22" x="0.75" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="23" x="2.25" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="24" x="3.75" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="25" x="5.25" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="26" x="6.75" y="-15.25" dx="0.9" dy="1.5" layer="1"/>
<smd name="43.2" x="-2.69" y="-0.05" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.3" x="0.31" y="-0.05" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.4" x="-2.69" y="-1.55" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.5" x="-1.19" y="-1.55" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.6" x="0.31" y="-1.55" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.7" x="-2.69" y="1.45" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.8" x="-1.19" y="1.45" dx="1.1" dy="1.1" layer="1"/>
<smd name="43.9" x="0.31" y="1.45" dx="1.1" dy="1.1" layer="1"/>
<pad name="43.10" x="-1.19" y="0.7" drill="0.2" diameter="0.4"/>
<pad name="43.11" x="-2.69" y="0.7" drill="0.2" diameter="0.4"/>
<pad name="43.12" x="0.31" y="0.7" drill="0.2" diameter="0.4"/>
<pad name="43.13" x="-2.69" y="-0.8" drill="0.2" diameter="0.4"/>
<pad name="43.14" x="-1.19" y="-0.8" drill="0.2" diameter="0.4"/>
<pad name="43.15" x="0.31" y="-0.8" drill="0.2" diameter="0.4"/>
<pad name="43.16" x="-1.94" y="1.45" drill="0.2" diameter="0.4"/>
<pad name="43.17" x="-0.44" y="1.45" drill="0.2" diameter="0.4"/>
<pad name="43.18" x="-1.94" y="-0.05" drill="0.2" diameter="0.4"/>
<pad name="43.19" x="-0.44" y="-0.05" drill="0.2" diameter="0.4"/>
<pad name="43.20" x="-1.94" y="-1.55" drill="0.2" diameter="0.4"/>
<pad name="43.21" x="-0.44" y="-1.55" drill="0.2" diameter="0.4"/>
</package>
</packages>
<symbols>
<symbol name="ESP32-S2-WROOM">
<description>ESP32-S2-WROOM and ESP32-S2-WROOM-I

(Drawn by Dave Williams | G8PUO | DitroniX)</description>
<wire x1="-10.16" y1="33.02" x2="10.16" y2="33.02" width="0.254" layer="94"/>
<wire x1="10.16" y1="33.02" x2="10.16" y2="-33.02" width="0.254" layer="94"/>
<wire x1="10.16" y1="-33.02" x2="-10.16" y2="-33.02" width="0.254" layer="94"/>
<wire x1="-10.16" y1="-33.02" x2="-10.16" y2="33.02" width="0.254" layer="94"/>
<text x="-9.9559" y="34.1345" size="1.783840625" layer="95">&gt;NAME</text>
<text x="-10.2067" y="-35.6681" size="1.78345" layer="96">&gt;VALUE</text>
<pin name="GND" x="15.24" y="-30.48" length="middle" direction="pwr" rot="R180"/>
<pin name="3V3" x="15.24" y="30.48" length="middle" direction="pwr" rot="R180"/>
<pin name="EN" x="-15.24" y="25.4" length="middle" direction="in"/>
<pin name="IO34" x="15.24" y="0" length="middle" rot="R180"/>
<pin name="IO35" x="15.24" y="-2.54" length="middle" rot="R180"/>
<pin name="IO33" x="15.24" y="2.54" length="middle" rot="R180"/>
<pin name="IO41" x="15.24" y="-17.78" length="middle" rot="R180"/>
<pin name="IO39" x="15.24" y="-12.7" length="middle" rot="R180"/>
<pin name="IO26" x="15.24" y="5.08" length="middle" rot="R180"/>
<pin name="IO40" x="15.24" y="-15.24" length="middle" rot="R180"/>
<pin name="IO14" x="-15.24" y="-22.86" length="middle"/>
<pin name="IO12" x="-15.24" y="-17.78" length="middle"/>
<pin name="IO13" x="-15.24" y="-20.32" length="middle"/>
<pin name="IO15" x="-15.24" y="-25.4" length="middle"/>
<pin name="IO2" x="-15.24" y="7.62" length="middle"/>
<pin name="IO0" x="-15.24" y="12.7" length="middle"/>
<pin name="IO4" x="-15.24" y="2.54" length="middle"/>
<pin name="IO16" x="15.24" y="20.32" length="middle" rot="R180"/>
<pin name="IO17" x="15.24" y="17.78" length="middle" rot="R180"/>
<pin name="IO5" x="-15.24" y="0" length="middle"/>
<pin name="IO18" x="15.24" y="15.24" length="middle" rot="R180"/>
<pin name="IO19" x="15.24" y="12.7" length="middle" rot="R180"/>
<pin name="IO21" x="15.24" y="7.62" length="middle" rot="R180"/>
<pin name="IO37" x="15.24" y="-7.62" length="middle" rot="R180"/>
<pin name="IO38" x="15.24" y="-10.16" length="middle" rot="R180"/>
<pin name="IO1" x="-15.24" y="10.16" length="middle"/>
<pin name="IO3" x="-15.24" y="5.08" length="middle"/>
<pin name="IO6" x="-15.24" y="-2.54" length="middle"/>
<pin name="IO7" x="-15.24" y="-5.08" length="middle"/>
<pin name="IO8" x="-15.24" y="-7.62" length="middle"/>
<pin name="IO9" x="-15.24" y="-10.16" length="middle"/>
<pin name="IO10" x="-15.24" y="-12.7" length="middle"/>
<pin name="IO11" x="-15.24" y="-15.24" length="middle"/>
<pin name="IO36" x="15.24" y="-5.08" length="middle" rot="R180"/>
<pin name="IO42" x="15.24" y="-20.32" length="middle" rot="R180"/>
<pin name="IO20" x="15.24" y="10.16" length="middle" rot="R180"/>
<pin name="TXD0" x="-15.24" y="17.78" length="middle"/>
<pin name="RXD0" x="-15.24" y="20.32" length="middle"/>
<pin name="IO45" x="15.24" y="-22.86" length="middle" rot="R180"/>
<pin name="IO46" x="15.24" y="-25.4" length="middle" rot="R180"/>
</symbol>
</symbols>
<devicesets>
<deviceset name="ESP32-S2-WROOM" prefix="U">
<description>WiFi 802.11b/g/n Transceiver Module 2.4GHz PCB Trace Surface Mount  &lt;a href="https://pricing.snapeda.com/parts/ESP32-S2-WROOM/Espressif%20Systems/view-part?ref=eda"&gt;Check availability&lt;/a&gt;</description>
<gates>
<gate name="G$1" symbol="ESP32-S2-WROOM" x="0" y="0"/>
</gates>
<devices>
<device name="" package="XCVR_ESP32-S2-WROOM">
<connects>
<connect gate="G$1" pin="3V3" pad="2"/>
<connect gate="G$1" pin="EN" pad="41"/>
<connect gate="G$1" pin="GND" pad="1 26 42 43.1 43.2 43.3 43.4 43.5 43.6 43.7 43.8 43.9 43.10 43.11 43.12 43.13 43.14 43.15 43.16 43.17 43.18 43.19 43.20 43.21"/>
<connect gate="G$1" pin="IO0" pad="3"/>
<connect gate="G$1" pin="IO1" pad="4"/>
<connect gate="G$1" pin="IO10" pad="13"/>
<connect gate="G$1" pin="IO11" pad="14"/>
<connect gate="G$1" pin="IO12" pad="15"/>
<connect gate="G$1" pin="IO13" pad="16"/>
<connect gate="G$1" pin="IO14" pad="17"/>
<connect gate="G$1" pin="IO15" pad="18"/>
<connect gate="G$1" pin="IO16" pad="19"/>
<connect gate="G$1" pin="IO17" pad="20"/>
<connect gate="G$1" pin="IO18" pad="21"/>
<connect gate="G$1" pin="IO19" pad="22"/>
<connect gate="G$1" pin="IO2" pad="5"/>
<connect gate="G$1" pin="IO20" pad="23"/>
<connect gate="G$1" pin="IO21" pad="24"/>
<connect gate="G$1" pin="IO26" pad="25"/>
<connect gate="G$1" pin="IO3" pad="6"/>
<connect gate="G$1" pin="IO33" pad="27"/>
<connect gate="G$1" pin="IO34" pad="28"/>
<connect gate="G$1" pin="IO35" pad="29"/>
<connect gate="G$1" pin="IO36" pad="30"/>
<connect gate="G$1" pin="IO37" pad="31"/>
<connect gate="G$1" pin="IO38" pad="32"/>
<connect gate="G$1" pin="IO39" pad="33"/>
<connect gate="G$1" pin="IO4" pad="7"/>
<connect gate="G$1" pin="IO40" pad="34"/>
<connect gate="G$1" pin="IO41" pad="35"/>
<connect gate="G$1" pin="IO42" pad="36"/>
<connect gate="G$1" pin="IO45" pad="39"/>
<connect gate="G$1" pin="IO46" pad="40"/>
<connect gate="G$1" pin="IO5" pad="8"/>
<connect gate="G$1" pin="IO6" pad="9"/>
<connect gate="G$1" pin="IO7" pad="10"/>
<connect gate="G$1" pin="IO8" pad="11"/>
<connect gate="G$1" pin="IO9" pad="12"/>
<connect gate="G$1" pin="RXD0" pad="38"/>
<connect gate="G$1" pin="TXD0" pad="37"/>
</connects>
<technologies>
<technology name="">
<attribute name="AVAILABILITY" value="In Stock"/>
<attribute name="DESCRIPTION" value=" WiFi 802.11b/g/n Transceiver Module 2.4GHz Antenna Not Included, I-PEX Surface Mount "/>
<attribute name="MF" value="Espressif Systems"/>
<attribute name="MP" value="ESP32-S2-WROOM"/>
<attribute name="PACKAGE" value="VFQFN-56 Espressif Systems"/>
<attribute name="PRICE" value="None"/>
<attribute name="PURCHASE-URL" value="https://pricing.snapeda.com/search/part/ESP32-S2-WROOM/?ref=eda"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
<library name="shared">
<packages>
<package name="POWERSO-20_STM">
<smd name="1" x="-6.7056" y="5.715" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="2" x="-6.7056" y="4.445" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="3" x="-6.7056" y="3.175" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="4" x="-6.7056" y="1.905" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="5" x="-6.7056" y="0.635" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="6" x="-6.7056" y="-0.635" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="7" x="-6.7056" y="-1.905" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="8" x="-6.7056" y="-3.175" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="9" x="-6.7056" y="-4.445" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="10" x="-6.7056" y="-5.715" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="11" x="6.7056" y="-5.715" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="12" x="6.7056" y="-4.445" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="13" x="6.7056" y="-3.175" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="14" x="6.7056" y="-1.905" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="15" x="6.7056" y="-0.635" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="16" x="6.7056" y="0.635" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="17" x="6.7056" y="1.905" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="18" x="6.7056" y="3.175" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="19" x="6.7056" y="4.445" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="20" x="6.7056" y="5.715" dx="1.8034" dy="0.5842" layer="1"/>
<smd name="EPAD" x="0" y="0" dx="6.1976" dy="16.002" layer="1" cream="no"/>
<wire x1="-5.6896" y1="-8.128" x2="-3.4036" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-8.128" x2="5.6896" y2="-6.3246" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="8.128" x2="3.4036" y2="8.128" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="8.128" x2="-5.6896" y2="6.3246" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-6.3246" x2="-5.6896" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="6.3246" x2="5.6896" y2="8.128" width="0.1524" layer="21"/>
<wire x1="3.4036" y1="-8.128" x2="5.6896" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="-3.4036" y1="8.128" x2="-5.6896" y2="8.128" width="0.1524" layer="21"/>
<polygon width="0.0254" layer="21">
<vertex x="-8.1153" y="-5.5245"/>
<vertex x="-8.1153" y="-5.9055"/>
<vertex x="-7.8613" y="-5.9055"/>
<vertex x="-7.8613" y="-5.5245"/>
</polygon>
<polygon width="0.0254" layer="21">
<vertex x="8.1153" y="5.9055"/>
<vertex x="8.1153" y="5.5245"/>
<vertex x="7.8613" y="5.5245"/>
<vertex x="7.8613" y="5.9055"/>
</polygon>
<text x="-7.5438" y="6.1722" size="1.27" layer="21" ratio="6" rot="SR0">*</text>
<text x="-1.7272" y="-0.635" size="1.27" layer="21" ratio="6" rot="SR0">&gt;Value</text>
<wire x1="-5.5372" y1="5.4356" x2="-5.5372" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="5.9944" x2="-7.2644" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="5.9944" x2="-7.2644" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="5.4356" x2="-5.5372" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="4.1656" x2="-5.5372" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="4.7244" x2="-7.2644" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="4.7244" x2="-7.2644" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="4.1656" x2="-5.5372" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="2.8956" x2="-5.5372" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="3.4544" x2="-7.2644" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="3.4544" x2="-7.2644" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="2.8956" x2="-5.5372" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="1.6256" x2="-5.5372" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="2.1844" x2="-7.2644" y2="2.159" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="2.159" x2="-7.2644" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="1.6256" x2="-5.5372" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="0.3556" x2="-5.5372" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="0.9144" x2="-7.2644" y2="0.889" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="0.889" x2="-7.2644" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="0.3556" x2="-5.5372" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-0.9144" x2="-5.5372" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-0.3556" x2="-7.2644" y2="-0.381" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-0.381" x2="-7.2644" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-0.9144" x2="-5.5372" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-2.1844" x2="-5.5372" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-1.6256" x2="-7.2644" y2="-1.651" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-1.651" x2="-7.2644" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-2.1844" x2="-5.5372" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-3.4544" x2="-5.5372" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-2.8956" x2="-7.2644" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-2.8956" x2="-7.2644" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-3.4544" x2="-5.5372" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-4.7244" x2="-5.5372" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-4.1656" x2="-7.2644" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-4.1656" x2="-7.2644" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-4.7244" x2="-5.5372" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-5.9944" x2="-5.5372" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-5.4356" x2="-7.2644" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-5.4356" x2="-7.2644" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="-5.9944" x2="-5.5372" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-5.4356" x2="5.5372" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-5.9944" x2="7.2644" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-5.9944" x2="7.2644" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-5.4356" x2="5.5372" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-4.1656" x2="5.5372" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-4.7244" x2="7.2644" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-4.7244" x2="7.2644" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-4.1656" x2="5.5372" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-2.8956" x2="5.5372" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-3.4544" x2="7.2644" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-3.4544" x2="7.2644" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-2.8956" x2="5.5372" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-1.6256" x2="5.5372" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-2.1844" x2="7.2644" y2="-2.159" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-2.159" x2="7.2644" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-1.6256" x2="5.5372" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-0.3556" x2="5.5372" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-0.9144" x2="7.2644" y2="-0.889" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-0.889" x2="7.2644" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-0.3556" x2="5.5372" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="0.9144" x2="5.5372" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="0.3556" x2="7.2644" y2="0.381" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="0.381" x2="7.2644" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="0.9144" x2="5.5372" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="2.1844" x2="5.5372" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="1.6256" x2="7.2644" y2="1.651" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="1.651" x2="7.2644" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="2.1844" x2="5.5372" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="3.4544" x2="5.5372" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="2.8956" x2="7.2644" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="2.8956" x2="7.2644" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="3.4544" x2="5.5372" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="4.7244" x2="5.5372" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="4.1656" x2="7.2644" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="4.1656" x2="7.2644" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="4.7244" x2="5.5372" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="5.9944" x2="5.5372" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="5.4356" x2="7.2644" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="5.4356" x2="7.2644" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="5.9944" x2="5.5372" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-8.001" x2="5.5372" y2="-8.001" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-8.001" x2="5.5372" y2="8.001" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="8.001" x2="0.3048" y2="8.001" width="0.1524" layer="51"/>
<wire x1="0.3048" y1="8.001" x2="-0.3048" y2="8.001" width="0.1524" layer="51"/>
<wire x1="-0.3048" y1="8.001" x2="-5.5372" y2="8.001" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="8.001" x2="-5.5372" y2="-8.001" width="0.1524" layer="51"/>
<wire x1="0.3048" y1="8.001" x2="-0.3048" y2="8.001" width="0.1524" layer="51" curve="-180"/>
<text x="-5.7404" y="6.6548" size="1.27" layer="51" ratio="6" rot="SR0">*</text>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="7.901"/>
<vertex x="-2.9988" y="6.7675"/>
<vertex x="-1.6494" y="6.7675"/>
<vertex x="-1.6494" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="6.5675"/>
<vertex x="-2.9988" y="5.434"/>
<vertex x="-1.6494" y="5.434"/>
<vertex x="-1.6494" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="5.234"/>
<vertex x="-2.9988" y="4.1005"/>
<vertex x="-1.6494" y="4.1005"/>
<vertex x="-1.6494" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="3.9005"/>
<vertex x="-2.9988" y="2.767"/>
<vertex x="-1.6494" y="2.767"/>
<vertex x="-1.6494" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="2.567"/>
<vertex x="-2.9988" y="1.4335"/>
<vertex x="-1.6494" y="1.4335"/>
<vertex x="-1.6494" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="1.2335"/>
<vertex x="-2.9988" y="0.1"/>
<vertex x="-1.6494" y="0.1"/>
<vertex x="-1.6494" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-0.1"/>
<vertex x="-2.9988" y="-1.2335"/>
<vertex x="-1.6494" y="-1.2335"/>
<vertex x="-1.6494" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-1.4335"/>
<vertex x="-2.9988" y="-2.567"/>
<vertex x="-1.6494" y="-2.567"/>
<vertex x="-1.6494" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-2.767"/>
<vertex x="-2.9988" y="-3.9005"/>
<vertex x="-1.6494" y="-3.9005"/>
<vertex x="-1.6494" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-4.1005"/>
<vertex x="-2.9988" y="-5.234"/>
<vertex x="-1.6494" y="-5.234"/>
<vertex x="-1.6494" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-5.434"/>
<vertex x="-2.9988" y="-6.5675"/>
<vertex x="-1.6494" y="-6.5675"/>
<vertex x="-1.6494" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-6.7675"/>
<vertex x="-2.9988" y="-7.901"/>
<vertex x="-1.6494" y="-7.901"/>
<vertex x="-1.6494" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="7.901"/>
<vertex x="-1.4494" y="6.7675"/>
<vertex x="-0.1" y="6.7675"/>
<vertex x="-0.1" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="6.5675"/>
<vertex x="-1.4494" y="5.434"/>
<vertex x="-0.1" y="5.434"/>
<vertex x="-0.1" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="5.234"/>
<vertex x="-1.4494" y="4.1005"/>
<vertex x="-0.1" y="4.1005"/>
<vertex x="-0.1" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="3.9005"/>
<vertex x="-1.4494" y="2.767"/>
<vertex x="-0.1" y="2.767"/>
<vertex x="-0.1" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="2.567"/>
<vertex x="-1.4494" y="1.4335"/>
<vertex x="-0.1" y="1.4335"/>
<vertex x="-0.1" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="1.2335"/>
<vertex x="-1.4494" y="0.1"/>
<vertex x="-0.1" y="0.1"/>
<vertex x="-0.1" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-0.1"/>
<vertex x="-1.4494" y="-1.2335"/>
<vertex x="-0.1" y="-1.2335"/>
<vertex x="-0.1" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-1.4335"/>
<vertex x="-1.4494" y="-2.567"/>
<vertex x="-0.1" y="-2.567"/>
<vertex x="-0.1" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-2.767"/>
<vertex x="-1.4494" y="-3.9005"/>
<vertex x="-0.1" y="-3.9005"/>
<vertex x="-0.1" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-4.1005"/>
<vertex x="-1.4494" y="-5.234"/>
<vertex x="-0.1" y="-5.234"/>
<vertex x="-0.1" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-5.434"/>
<vertex x="-1.4494" y="-6.5675"/>
<vertex x="-0.1" y="-6.5675"/>
<vertex x="-0.1" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-6.7675"/>
<vertex x="-1.4494" y="-7.901"/>
<vertex x="-0.1" y="-7.901"/>
<vertex x="-0.1" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="7.901"/>
<vertex x="0.1" y="6.7675"/>
<vertex x="1.4494" y="6.7675"/>
<vertex x="1.4494" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="6.5675"/>
<vertex x="0.1" y="5.434"/>
<vertex x="1.4494" y="5.434"/>
<vertex x="1.4494" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="5.234"/>
<vertex x="0.1" y="4.1005"/>
<vertex x="1.4494" y="4.1005"/>
<vertex x="1.4494" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="3.9005"/>
<vertex x="0.1" y="2.767"/>
<vertex x="1.4494" y="2.767"/>
<vertex x="1.4494" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="2.567"/>
<vertex x="0.1" y="1.4335"/>
<vertex x="1.4494" y="1.4335"/>
<vertex x="1.4494" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="1.2335"/>
<vertex x="0.1" y="0.1"/>
<vertex x="1.4494" y="0.1"/>
<vertex x="1.4494" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-0.1"/>
<vertex x="0.1" y="-1.2335"/>
<vertex x="1.4494" y="-1.2335"/>
<vertex x="1.4494" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-1.4335"/>
<vertex x="0.1" y="-2.567"/>
<vertex x="1.4494" y="-2.567"/>
<vertex x="1.4494" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-2.767"/>
<vertex x="0.1" y="-3.9005"/>
<vertex x="1.4494" y="-3.9005"/>
<vertex x="1.4494" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-4.1005"/>
<vertex x="0.1" y="-5.234"/>
<vertex x="1.4494" y="-5.234"/>
<vertex x="1.4494" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-5.434"/>
<vertex x="0.1" y="-6.5675"/>
<vertex x="1.4494" y="-6.5675"/>
<vertex x="1.4494" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-6.7675"/>
<vertex x="0.1" y="-7.901"/>
<vertex x="1.4494" y="-7.901"/>
<vertex x="1.4494" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="7.901"/>
<vertex x="1.6494" y="6.7675"/>
<vertex x="2.9988" y="6.7675"/>
<vertex x="2.9988" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="6.5675"/>
<vertex x="1.6494" y="5.434"/>
<vertex x="2.9988" y="5.434"/>
<vertex x="2.9988" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="5.234"/>
<vertex x="1.6494" y="4.1005"/>
<vertex x="2.9988" y="4.1005"/>
<vertex x="2.9988" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="3.9005"/>
<vertex x="1.6494" y="2.767"/>
<vertex x="2.9988" y="2.767"/>
<vertex x="2.9988" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="2.567"/>
<vertex x="1.6494" y="1.4335"/>
<vertex x="2.9988" y="1.4335"/>
<vertex x="2.9988" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="1.2335"/>
<vertex x="1.6494" y="0.1"/>
<vertex x="2.9988" y="0.1"/>
<vertex x="2.9988" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-0.1"/>
<vertex x="1.6494" y="-1.2335"/>
<vertex x="2.9988" y="-1.2335"/>
<vertex x="2.9988" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-1.4335"/>
<vertex x="1.6494" y="-2.567"/>
<vertex x="2.9988" y="-2.567"/>
<vertex x="2.9988" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-2.767"/>
<vertex x="1.6494" y="-3.9005"/>
<vertex x="2.9988" y="-3.9005"/>
<vertex x="2.9988" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-4.1005"/>
<vertex x="1.6494" y="-5.234"/>
<vertex x="2.9988" y="-5.234"/>
<vertex x="2.9988" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-5.434"/>
<vertex x="1.6494" y="-6.5675"/>
<vertex x="2.9988" y="-6.5675"/>
<vertex x="2.9988" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-6.7675"/>
<vertex x="1.6494" y="-7.901"/>
<vertex x="2.9988" y="-7.901"/>
<vertex x="2.9988" y="-6.7675"/>
</polygon>
<polygon width="0.1524" layer="41">
<vertex x="-8.2423" y="-8.636"/>
<vertex x="-8.2423" y="8.636"/>
<vertex x="8.2423" y="8.636"/>
<vertex x="8.2423" y="-8.636"/>
</polygon>
<wire x1="-5.5372" y1="0" x2="-5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.5372" y2="10.287" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="0" x2="5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.5372" y2="10.287" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.2832" y2="10.033" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="-5.2832" y1="10.033" x2="-5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.2832" y2="10.033" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="5.2832" y1="10.033" x2="5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-10.287" x2="-7.2644" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.2644" y2="12.192" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="0" x2="7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.2644" y2="12.192" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.0104" y2="11.938" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="-7.0104" y1="11.938" x2="-7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.0104" y2="11.938" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="7.0104" y1="11.938" x2="7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="0" y1="8.001" x2="8.0772" y2="8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.4836" y2="8.001" width="0.1524" layer="47"/>
<wire x1="0" y1="-8.001" x2="8.0772" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="8.4836" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.0772" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="7.9756" y2="7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.2296" y2="7.747" width="0.1524" layer="47"/>
<wire x1="7.9756" y1="7.747" x2="8.2296" y2="7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="7.9756" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="8.2296" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="7.9756" y1="-7.747" x2="8.2296" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="-6.7056" y1="5.715" x2="-9.2456" y2="5.715" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="5.715" x2="-9.6266" y2="5.715" width="0.1524" layer="47"/>
<wire x1="-6.7056" y1="4.445" x2="-9.2456" y2="4.445" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="4.445" x2="-9.6266" y2="4.445" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="5.715" x2="-9.2456" y2="6.985" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="4.445" x2="-9.2456" y2="3.175" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="5.715" x2="-9.3726" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="5.715" x2="-9.1186" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.3726" y1="5.969" x2="-9.1186" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="4.445" x2="-9.3726" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-9.2456" y1="4.445" x2="-9.1186" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-9.3726" y1="4.191" x2="-9.1186" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="0" x2="-6.1468" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-6.1468" y2="-10.287" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-8.5344" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-4.8768" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.5184" y2="-9.779" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.5184" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-7.5184" y1="-9.779" x2="-7.5184" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-5.8928" y2="-9.779" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-5.8928" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-5.8928" y1="-9.779" x2="-5.8928" y2="-10.033" width="0.1524" layer="47"/>
<text x="-15.2146" y="-13.081" size="1.27" layer="47" ratio="6" rot="SR0">Default Padstyle: RX71Y23D0T</text>
<text x="-15.5702" y="-14.605" size="1.27" layer="47" ratio="6" rot="SR0">Pin One Padstyle: RX71Y23D0T</text>
<text x="-17.2974" y="-16.129" size="1.27" layer="47" ratio="6" rot="SR0">Heat Tab Padstyle: RX244Y630D0T</text>
<text x="-14.8082" y="-19.177" size="1.27" layer="47" ratio="6" rot="SR0">Alt 1 Padstyle: OX60Y90D30P</text>
<text x="-14.8082" y="-20.701" size="1.27" layer="47" ratio="6" rot="SR0">Alt 2 Padstyle: OX90Y60D30P</text>
<text x="-3.7592" y="10.414" size="0.635" layer="47" ratio="4" rot="SR0">0.437in/11.1mm</text>
<text x="-4.318" y="12.319" size="0.635" layer="47" ratio="4" rot="SR0">0.571in/14.503mm</text>
<text x="8.5852" y="-0.3048" size="0.635" layer="47" ratio="4" rot="SR0">0.63in/16.002mm</text>
<text x="-16.6878" y="4.7752" size="0.635" layer="47" ratio="4" rot="SR0">0.05in/1.27mm</text>
<text x="-10.7442" y="-11.049" size="0.635" layer="47" ratio="4" rot="SR0">0.043in/1.092mm</text>
<text x="-3.2766" y="-0.635" size="1.27" layer="27" ratio="6" rot="SR0">&gt;Name</text>
</package>
<package name="POWERSO-20_STM-M">
<smd name="1" x="-6.7564" y="5.715" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="2" x="-6.7564" y="4.445" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="3" x="-6.7564" y="3.175" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="4" x="-6.7564" y="1.905" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="5" x="-6.7564" y="0.635" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="6" x="-6.7564" y="-0.635" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="7" x="-6.7564" y="-1.905" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="8" x="-6.7564" y="-3.175" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="9" x="-6.7564" y="-4.445" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="10" x="-6.7564" y="-5.715" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="11" x="6.7564" y="-5.715" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="12" x="6.7564" y="-4.445" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="13" x="6.7564" y="-3.175" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="14" x="6.7564" y="-1.905" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="15" x="6.7564" y="-0.635" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="16" x="6.7564" y="0.635" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="17" x="6.7564" y="1.905" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="18" x="6.7564" y="3.175" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="19" x="6.7564" y="4.445" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="20" x="6.7564" y="5.715" dx="2.1082" dy="0.5842" layer="1"/>
<smd name="EPAD" x="0" y="0" dx="6.1976" dy="16.002" layer="1" cream="no"/>
<wire x1="-5.6896" y1="-8.128" x2="-3.4036" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-8.128" x2="5.6896" y2="-6.35" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="8.128" x2="3.4036" y2="8.128" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="8.128" x2="-5.6896" y2="6.35" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-6.35" x2="-5.6896" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="6.35" x2="5.6896" y2="8.128" width="0.1524" layer="21"/>
<wire x1="3.4036" y1="-8.128" x2="5.6896" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="-3.4036" y1="8.128" x2="-5.6896" y2="8.128" width="0.1524" layer="21"/>
<polygon width="0.0254" layer="21">
<vertex x="-8.3185" y="-5.5245"/>
<vertex x="-8.3185" y="-5.9055"/>
<vertex x="-8.0645" y="-5.9055"/>
<vertex x="-8.0645" y="-5.5245"/>
</polygon>
<polygon width="0.0254" layer="21">
<vertex x="8.3185" y="5.9055"/>
<vertex x="8.3185" y="5.5245"/>
<vertex x="8.0645" y="5.5245"/>
<vertex x="8.0645" y="5.9055"/>
</polygon>
<text x="-7.5946" y="6.1722" size="1.27" layer="21" ratio="6" rot="SR0">*</text>
<text x="-1.7272" y="-0.635" size="1.27" layer="21" ratio="6" rot="SR0">&gt;Value</text>
<wire x1="-5.5372" y1="5.4356" x2="-5.5626" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-5.5626" y1="5.9944" x2="-7.2644" y2="5.969" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="5.969" x2="-7.2644" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="5.4356" x2="-5.5372" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="4.1656" x2="-5.5626" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="-5.5626" y1="4.7244" x2="-7.2644" y2="4.699" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="4.699" x2="-7.2644" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="4.1656" x2="-5.5372" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="2.8956" x2="-5.5372" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="3.4544" x2="-7.2644" y2="3.429" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="3.429" x2="-7.239" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="2.8956" x2="-5.5372" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="1.6256" x2="-5.5372" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="2.1844" x2="-7.239" y2="2.159" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="2.159" x2="-7.239" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="1.6256" x2="-5.5372" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="0.3556" x2="-5.5372" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="0.9144" x2="-7.239" y2="0.889" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="0.889" x2="-7.239" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="0.3556" x2="-5.5372" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-0.9144" x2="-5.5372" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-0.3556" x2="-7.239" y2="-0.381" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-0.381" x2="-7.239" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-0.9144" x2="-5.5372" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-2.1844" x2="-5.5372" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-1.6256" x2="-7.239" y2="-1.651" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-1.651" x2="-7.239" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-2.1844" x2="-5.5372" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-3.4544" x2="-5.5372" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-2.8956" x2="-7.239" y2="-2.921" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-2.921" x2="-7.239" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-3.4544" x2="-5.5372" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-4.7244" x2="-5.5372" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-4.1656" x2="-7.239" y2="-4.191" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-4.191" x2="-7.239" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-4.7244" x2="-5.5372" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-5.9944" x2="-5.5372" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-5.4356" x2="-7.239" y2="-5.461" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-5.461" x2="-7.239" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-5.9944" x2="-5.5372" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-5.4356" x2="5.5626" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="5.5626" y1="-5.9944" x2="7.2644" y2="-5.969" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-5.969" x2="7.2644" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-5.4356" x2="5.5372" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-4.1656" x2="5.5372" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-4.7244" x2="7.2644" y2="-4.699" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-4.699" x2="7.239" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-4.1656" x2="5.5372" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-2.8956" x2="5.5372" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-3.4544" x2="7.2644" y2="-3.429" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-3.429" x2="7.239" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-2.8956" x2="5.5372" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-1.6256" x2="5.5372" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-2.1844" x2="7.2644" y2="-2.159" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-2.159" x2="7.239" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-1.6256" x2="5.5372" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-0.3556" x2="5.5372" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-0.9144" x2="7.239" y2="-0.889" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-0.889" x2="7.239" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-0.3556" x2="5.5372" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="0.9144" x2="5.5372" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="0.3556" x2="7.239" y2="0.381" width="0.1524" layer="51"/>
<wire x1="7.239" y1="0.381" x2="7.239" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="7.239" y1="0.9144" x2="5.5372" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="2.1844" x2="5.5372" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="1.6256" x2="7.239" y2="1.651" width="0.1524" layer="51"/>
<wire x1="7.239" y1="1.651" x2="7.239" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="7.239" y1="2.1844" x2="5.5372" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="3.4544" x2="5.5372" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="2.8956" x2="7.239" y2="2.921" width="0.1524" layer="51"/>
<wire x1="7.239" y1="2.921" x2="7.239" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="7.239" y1="3.4544" x2="5.5372" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="4.7244" x2="5.5372" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="4.1656" x2="7.239" y2="4.191" width="0.1524" layer="51"/>
<wire x1="7.239" y1="4.191" x2="7.239" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="7.239" y1="4.7244" x2="5.5372" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="5.9944" x2="5.5372" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="5.4356" x2="7.239" y2="5.461" width="0.1524" layer="51"/>
<wire x1="7.239" y1="5.461" x2="7.239" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="7.239" y1="5.9944" x2="5.5372" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-8.001" x2="5.5372" y2="-8.001" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-8.001" x2="5.5372" y2="8.001" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="8.001" x2="0.3048" y2="8.001" width="0.1524" layer="51"/>
<wire x1="0.3048" y1="8.001" x2="-0.3048" y2="8.001" width="0.1524" layer="51"/>
<wire x1="-0.3048" y1="8.001" x2="-5.5372" y2="8.001" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="8.001" x2="-5.5372" y2="-8.001" width="0.1524" layer="51"/>
<wire x1="0.3048" y1="8.001" x2="-0.3048" y2="8.001" width="0.1524" layer="51" curve="-180"/>
<text x="-5.7404" y="6.6548" size="1.27" layer="51" ratio="6" rot="SR0">*</text>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="7.901"/>
<vertex x="-2.9988" y="6.7675"/>
<vertex x="-1.6494" y="6.7675"/>
<vertex x="-1.6494" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="6.5675"/>
<vertex x="-2.9988" y="5.434"/>
<vertex x="-1.6494" y="5.434"/>
<vertex x="-1.6494" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="5.234"/>
<vertex x="-2.9988" y="4.1005"/>
<vertex x="-1.6494" y="4.1005"/>
<vertex x="-1.6494" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="3.9005"/>
<vertex x="-2.9988" y="2.767"/>
<vertex x="-1.6494" y="2.767"/>
<vertex x="-1.6494" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="2.567"/>
<vertex x="-2.9988" y="1.4335"/>
<vertex x="-1.6494" y="1.4335"/>
<vertex x="-1.6494" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="1.2335"/>
<vertex x="-2.9988" y="0.1"/>
<vertex x="-1.6494" y="0.1"/>
<vertex x="-1.6494" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-0.1"/>
<vertex x="-2.9988" y="-1.2335"/>
<vertex x="-1.6494" y="-1.2335"/>
<vertex x="-1.6494" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-1.4335"/>
<vertex x="-2.9988" y="-2.567"/>
<vertex x="-1.6494" y="-2.567"/>
<vertex x="-1.6494" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-2.767"/>
<vertex x="-2.9988" y="-3.9005"/>
<vertex x="-1.6494" y="-3.9005"/>
<vertex x="-1.6494" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-4.1005"/>
<vertex x="-2.9988" y="-5.234"/>
<vertex x="-1.6494" y="-5.234"/>
<vertex x="-1.6494" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-5.434"/>
<vertex x="-2.9988" y="-6.5675"/>
<vertex x="-1.6494" y="-6.5675"/>
<vertex x="-1.6494" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-6.7675"/>
<vertex x="-2.9988" y="-7.901"/>
<vertex x="-1.6494" y="-7.901"/>
<vertex x="-1.6494" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="7.901"/>
<vertex x="-1.4494" y="6.7675"/>
<vertex x="-0.1" y="6.7675"/>
<vertex x="-0.1" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="6.5675"/>
<vertex x="-1.4494" y="5.434"/>
<vertex x="-0.1" y="5.434"/>
<vertex x="-0.1" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="5.234"/>
<vertex x="-1.4494" y="4.1005"/>
<vertex x="-0.1" y="4.1005"/>
<vertex x="-0.1" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="3.9005"/>
<vertex x="-1.4494" y="2.767"/>
<vertex x="-0.1" y="2.767"/>
<vertex x="-0.1" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="2.567"/>
<vertex x="-1.4494" y="1.4335"/>
<vertex x="-0.1" y="1.4335"/>
<vertex x="-0.1" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="1.2335"/>
<vertex x="-1.4494" y="0.1"/>
<vertex x="-0.1" y="0.1"/>
<vertex x="-0.1" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-0.1"/>
<vertex x="-1.4494" y="-1.2335"/>
<vertex x="-0.1" y="-1.2335"/>
<vertex x="-0.1" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-1.4335"/>
<vertex x="-1.4494" y="-2.567"/>
<vertex x="-0.1" y="-2.567"/>
<vertex x="-0.1" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-2.767"/>
<vertex x="-1.4494" y="-3.9005"/>
<vertex x="-0.1" y="-3.9005"/>
<vertex x="-0.1" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-4.1005"/>
<vertex x="-1.4494" y="-5.234"/>
<vertex x="-0.1" y="-5.234"/>
<vertex x="-0.1" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-5.434"/>
<vertex x="-1.4494" y="-6.5675"/>
<vertex x="-0.1" y="-6.5675"/>
<vertex x="-0.1" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-6.7675"/>
<vertex x="-1.4494" y="-7.901"/>
<vertex x="-0.1" y="-7.901"/>
<vertex x="-0.1" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="7.901"/>
<vertex x="0.1" y="6.7675"/>
<vertex x="1.4494" y="6.7675"/>
<vertex x="1.4494" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="6.5675"/>
<vertex x="0.1" y="5.434"/>
<vertex x="1.4494" y="5.434"/>
<vertex x="1.4494" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="5.234"/>
<vertex x="0.1" y="4.1005"/>
<vertex x="1.4494" y="4.1005"/>
<vertex x="1.4494" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="3.9005"/>
<vertex x="0.1" y="2.767"/>
<vertex x="1.4494" y="2.767"/>
<vertex x="1.4494" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="2.567"/>
<vertex x="0.1" y="1.4335"/>
<vertex x="1.4494" y="1.4335"/>
<vertex x="1.4494" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="1.2335"/>
<vertex x="0.1" y="0.1"/>
<vertex x="1.4494" y="0.1"/>
<vertex x="1.4494" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-0.1"/>
<vertex x="0.1" y="-1.2335"/>
<vertex x="1.4494" y="-1.2335"/>
<vertex x="1.4494" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-1.4335"/>
<vertex x="0.1" y="-2.567"/>
<vertex x="1.4494" y="-2.567"/>
<vertex x="1.4494" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-2.767"/>
<vertex x="0.1" y="-3.9005"/>
<vertex x="1.4494" y="-3.9005"/>
<vertex x="1.4494" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-4.1005"/>
<vertex x="0.1" y="-5.234"/>
<vertex x="1.4494" y="-5.234"/>
<vertex x="1.4494" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-5.434"/>
<vertex x="0.1" y="-6.5675"/>
<vertex x="1.4494" y="-6.5675"/>
<vertex x="1.4494" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-6.7675"/>
<vertex x="0.1" y="-7.901"/>
<vertex x="1.4494" y="-7.901"/>
<vertex x="1.4494" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="7.901"/>
<vertex x="1.6494" y="6.7675"/>
<vertex x="2.9988" y="6.7675"/>
<vertex x="2.9988" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="6.5675"/>
<vertex x="1.6494" y="5.434"/>
<vertex x="2.9988" y="5.434"/>
<vertex x="2.9988" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="5.234"/>
<vertex x="1.6494" y="4.1005"/>
<vertex x="2.9988" y="4.1005"/>
<vertex x="2.9988" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="3.9005"/>
<vertex x="1.6494" y="2.767"/>
<vertex x="2.9988" y="2.767"/>
<vertex x="2.9988" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="2.567"/>
<vertex x="1.6494" y="1.4335"/>
<vertex x="2.9988" y="1.4335"/>
<vertex x="2.9988" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="1.2335"/>
<vertex x="1.6494" y="0.1"/>
<vertex x="2.9988" y="0.1"/>
<vertex x="2.9988" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-0.1"/>
<vertex x="1.6494" y="-1.2335"/>
<vertex x="2.9988" y="-1.2335"/>
<vertex x="2.9988" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-1.4335"/>
<vertex x="1.6494" y="-2.567"/>
<vertex x="2.9988" y="-2.567"/>
<vertex x="2.9988" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-2.767"/>
<vertex x="1.6494" y="-3.9005"/>
<vertex x="2.9988" y="-3.9005"/>
<vertex x="2.9988" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-4.1005"/>
<vertex x="1.6494" y="-5.234"/>
<vertex x="2.9988" y="-5.234"/>
<vertex x="2.9988" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-5.434"/>
<vertex x="1.6494" y="-6.5675"/>
<vertex x="2.9988" y="-6.5675"/>
<vertex x="2.9988" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-6.7675"/>
<vertex x="1.6494" y="-7.901"/>
<vertex x="2.9988" y="-7.901"/>
<vertex x="2.9988" y="-6.7675"/>
</polygon>
<polygon width="0.1524" layer="41">
<vertex x="-8.6995" y="-8.89"/>
<vertex x="-8.6995" y="8.89"/>
<vertex x="8.6995" y="8.89"/>
<vertex x="8.6995" y="-8.89"/>
</polygon>
<wire x1="-5.5372" y1="0" x2="-5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.5372" y2="10.287" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="0" x2="5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.5372" y2="10.287" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.2832" y2="10.033" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="-5.2832" y1="10.033" x2="-5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.2832" y2="10.033" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="5.2832" y1="10.033" x2="5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-10.287" x2="-7.2644" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.2644" y2="12.192" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="0" x2="7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.2644" y2="12.192" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.0104" y2="11.938" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="-7.0104" y1="11.938" x2="-7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.0104" y2="11.938" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="7.0104" y1="11.938" x2="7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="0" y1="8.001" x2="8.0772" y2="8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.4836" y2="8.001" width="0.1524" layer="47"/>
<wire x1="0" y1="-8.001" x2="8.0772" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="8.4836" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.0772" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="7.9756" y2="7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.2296" y2="7.747" width="0.1524" layer="47"/>
<wire x1="7.9756" y1="7.747" x2="8.2296" y2="7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="7.9756" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="8.2296" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="7.9756" y1="-7.747" x2="8.2296" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="-6.7564" y1="5.715" x2="-9.2964" y2="5.715" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="5.715" x2="-9.6774" y2="5.715" width="0.1524" layer="47"/>
<wire x1="-6.7564" y1="4.445" x2="-9.2964" y2="4.445" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="4.445" x2="-9.6774" y2="4.445" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="5.715" x2="-9.2964" y2="6.985" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="4.445" x2="-9.2964" y2="3.175" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="5.715" x2="-9.4234" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="5.715" x2="-9.1694" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.4234" y1="5.969" x2="-9.1694" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="4.445" x2="-9.4234" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-9.2964" y1="4.445" x2="-9.1694" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-9.4234" y1="4.191" x2="-9.1694" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="0" x2="-6.1468" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-6.1468" y2="-10.287" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-8.5344" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-4.8768" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.5184" y2="-9.779" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.5184" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-7.5184" y1="-9.779" x2="-7.5184" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-5.8928" y2="-9.779" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-5.8928" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-5.8928" y1="-9.779" x2="-5.8928" y2="-10.033" width="0.1524" layer="47"/>
<text x="-15.2146" y="-13.081" size="1.27" layer="47" ratio="6" rot="SR0">Default Padstyle: RX83Y23D0T</text>
<text x="-15.5702" y="-14.605" size="1.27" layer="47" ratio="6" rot="SR0">Pin One Padstyle: RX83Y23D0T</text>
<text x="-17.2974" y="-16.129" size="1.27" layer="47" ratio="6" rot="SR0">Heat Tab Padstyle: RX244Y630D0T</text>
<text x="-14.8082" y="-19.177" size="1.27" layer="47" ratio="6" rot="SR0">Alt 1 Padstyle: OX60Y90D30P</text>
<text x="-14.8082" y="-20.701" size="1.27" layer="47" ratio="6" rot="SR0">Alt 2 Padstyle: OX90Y60D30P</text>
<text x="-3.7592" y="10.414" size="0.635" layer="47" ratio="4" rot="SR0">0.437in/11.1mm</text>
<text x="-4.318" y="12.319" size="0.635" layer="47" ratio="4" rot="SR0">0.571in/14.503mm</text>
<text x="8.5852" y="-0.3048" size="0.635" layer="47" ratio="4" rot="SR0">0.63in/16.002mm</text>
<text x="-16.7386" y="4.7752" size="0.635" layer="47" ratio="4" rot="SR0">0.05in/1.27mm</text>
<text x="-10.7442" y="-11.049" size="0.635" layer="47" ratio="4" rot="SR0">0.043in/1.092mm</text>
<text x="-3.2766" y="-0.635" size="1.27" layer="27" ratio="6" rot="SR0">&gt;Name</text>
</package>
<package name="POWERSO-20_STM-L">
<smd name="1" x="-6.6548" y="5.715" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="2" x="-6.6548" y="4.445" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="3" x="-6.6548" y="3.175" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="4" x="-6.6548" y="1.905" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="5" x="-6.6548" y="0.635" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="6" x="-6.6548" y="-0.635" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="7" x="-6.6548" y="-1.905" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="8" x="-6.6548" y="-3.175" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="9" x="-6.6548" y="-4.445" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="10" x="-6.6548" y="-5.715" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="11" x="6.6548" y="-5.715" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="12" x="6.6548" y="-4.445" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="13" x="6.6548" y="-3.175" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="14" x="6.6548" y="-1.905" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="15" x="6.6548" y="-0.635" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="16" x="6.6548" y="0.635" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="17" x="6.6548" y="1.905" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="18" x="6.6548" y="3.175" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="19" x="6.6548" y="4.445" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="20" x="6.6548" y="5.715" dx="1.4986" dy="0.5334" layer="1"/>
<smd name="EPAD" x="0" y="0" dx="6.1976" dy="16.002" layer="1" cream="no"/>
<wire x1="-5.6896" y1="-8.128" x2="-3.4036" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-8.128" x2="5.6896" y2="-6.223" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="8.128" x2="3.4036" y2="8.128" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="8.128" x2="-5.6896" y2="6.223" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="5.207" x2="-5.6896" y2="4.953" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="3.937" x2="-5.6896" y2="3.683" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="2.667" x2="-5.6896" y2="2.413" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="1.397" x2="-5.6896" y2="1.143" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="0.127" x2="-5.6896" y2="-0.127" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-1.143" x2="-5.6896" y2="-1.397" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-2.413" x2="-5.6896" y2="-2.667" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-3.683" x2="-5.6896" y2="-3.937" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-4.953" x2="-5.6896" y2="-5.207" width="0.1524" layer="21"/>
<wire x1="-5.6896" y1="-6.223" x2="-5.6896" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-5.207" x2="5.6896" y2="-4.953" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-3.937" x2="5.6896" y2="-3.683" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-2.667" x2="5.6896" y2="-2.413" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-1.397" x2="5.6896" y2="-1.143" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="-0.127" x2="5.6896" y2="0.127" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="1.143" x2="5.6896" y2="1.397" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="2.413" x2="5.6896" y2="2.667" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="3.683" x2="5.6896" y2="3.937" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="4.953" x2="5.6896" y2="5.207" width="0.1524" layer="21"/>
<wire x1="5.6896" y1="6.223" x2="5.6896" y2="8.128" width="0.1524" layer="21"/>
<wire x1="3.4036" y1="-8.128" x2="5.6896" y2="-8.128" width="0.1524" layer="21"/>
<wire x1="-3.4036" y1="8.128" x2="-5.6896" y2="8.128" width="0.1524" layer="21"/>
<polygon width="0.0254" layer="21">
<vertex x="-7.9121" y="-5.5245"/>
<vertex x="-7.9121" y="-5.9055"/>
<vertex x="-7.6581" y="-5.9055"/>
<vertex x="-7.6581" y="-5.5245"/>
</polygon>
<polygon width="0.0254" layer="21">
<vertex x="7.9121" y="5.9055"/>
<vertex x="7.9121" y="5.5245"/>
<vertex x="7.6581" y="5.5245"/>
<vertex x="7.6581" y="5.9055"/>
</polygon>
<text x="-7.493" y="6.1214" size="1.27" layer="21" ratio="6" rot="SR0">*</text>
<text x="-1.7272" y="-0.635" size="1.27" layer="21" ratio="6" rot="SR0">&gt;Value</text>
<wire x1="-5.5372" y1="5.4356" x2="-5.5626" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-5.5626" y1="5.9944" x2="-7.2644" y2="5.969" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="5.969" x2="-7.2644" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="5.4356" x2="-5.5372" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="4.1656" x2="-5.5626" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="-5.5626" y1="4.7244" x2="-7.2644" y2="4.699" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="4.699" x2="-7.2644" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="4.1656" x2="-5.5372" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="2.8956" x2="-5.5372" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="3.4544" x2="-7.2644" y2="3.429" width="0.1524" layer="51"/>
<wire x1="-7.2644" y1="3.429" x2="-7.239" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="2.8956" x2="-5.5372" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="1.6256" x2="-5.5372" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="2.1844" x2="-7.239" y2="2.159" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="2.159" x2="-7.239" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="1.6256" x2="-5.5372" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="0.3556" x2="-5.5372" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="0.9144" x2="-7.239" y2="0.889" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="0.889" x2="-7.239" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="0.3556" x2="-5.5372" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-0.9144" x2="-5.5372" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-0.3556" x2="-7.239" y2="-0.381" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-0.381" x2="-7.239" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-0.9144" x2="-5.5372" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-2.1844" x2="-5.5372" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-1.6256" x2="-7.239" y2="-1.651" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-1.651" x2="-7.239" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-2.1844" x2="-5.5372" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-3.4544" x2="-5.5372" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-2.8956" x2="-7.239" y2="-2.921" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-2.921" x2="-7.239" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-3.4544" x2="-5.5372" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-4.7244" x2="-5.5372" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-4.1656" x2="-7.239" y2="-4.191" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-4.191" x2="-7.239" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-4.7244" x2="-5.5372" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-5.9944" x2="-5.5372" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-5.4356" x2="-7.239" y2="-5.461" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-5.461" x2="-7.239" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="-7.239" y1="-5.9944" x2="-5.5372" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-5.4356" x2="5.5626" y2="-5.9944" width="0.1524" layer="51"/>
<wire x1="5.5626" y1="-5.9944" x2="7.2644" y2="-5.969" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-5.969" x2="7.2644" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-5.4356" x2="5.5372" y2="-5.4356" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-4.1656" x2="5.5372" y2="-4.7244" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-4.7244" x2="7.2644" y2="-4.699" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-4.699" x2="7.239" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-4.1656" x2="5.5372" y2="-4.1656" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-2.8956" x2="5.5372" y2="-3.4544" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-3.4544" x2="7.2644" y2="-3.429" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-3.429" x2="7.239" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-2.8956" x2="5.5372" y2="-2.8956" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-1.6256" x2="5.5372" y2="-2.1844" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-2.1844" x2="7.2644" y2="-2.159" width="0.1524" layer="51"/>
<wire x1="7.2644" y1="-2.159" x2="7.239" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-1.6256" x2="5.5372" y2="-1.6256" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-0.3556" x2="5.5372" y2="-0.9144" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-0.9144" x2="7.239" y2="-0.889" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-0.889" x2="7.239" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="7.239" y1="-0.3556" x2="5.5372" y2="-0.3556" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="0.9144" x2="5.5372" y2="0.3556" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="0.3556" x2="7.239" y2="0.381" width="0.1524" layer="51"/>
<wire x1="7.239" y1="0.381" x2="7.239" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="7.239" y1="0.9144" x2="5.5372" y2="0.9144" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="2.1844" x2="5.5372" y2="1.6256" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="1.6256" x2="7.239" y2="1.651" width="0.1524" layer="51"/>
<wire x1="7.239" y1="1.651" x2="7.239" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="7.239" y1="2.1844" x2="5.5372" y2="2.1844" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="3.4544" x2="5.5372" y2="2.8956" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="2.8956" x2="7.239" y2="2.921" width="0.1524" layer="51"/>
<wire x1="7.239" y1="2.921" x2="7.239" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="7.239" y1="3.4544" x2="5.5372" y2="3.4544" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="4.7244" x2="5.5372" y2="4.1656" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="4.1656" x2="7.239" y2="4.191" width="0.1524" layer="51"/>
<wire x1="7.239" y1="4.191" x2="7.239" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="7.239" y1="4.7244" x2="5.5372" y2="4.7244" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="5.9944" x2="5.5372" y2="5.4356" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="5.4356" x2="7.239" y2="5.461" width="0.1524" layer="51"/>
<wire x1="7.239" y1="5.461" x2="7.239" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="7.239" y1="5.9944" x2="5.5372" y2="5.9944" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="-8.001" x2="5.5372" y2="-8.001" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="-8.001" x2="5.5372" y2="8.001" width="0.1524" layer="51"/>
<wire x1="5.5372" y1="8.001" x2="0.3048" y2="8.001" width="0.1524" layer="51"/>
<wire x1="0.3048" y1="8.001" x2="-0.3048" y2="8.001" width="0.1524" layer="51"/>
<wire x1="-0.3048" y1="8.001" x2="-5.5372" y2="8.001" width="0.1524" layer="51"/>
<wire x1="-5.5372" y1="8.001" x2="-5.5372" y2="-8.001" width="0.1524" layer="51"/>
<wire x1="0.3048" y1="8.001" x2="-0.3048" y2="8.001" width="0.1524" layer="51" curve="-180"/>
<text x="-5.7404" y="6.6548" size="1.27" layer="51" ratio="6" rot="SR0">*</text>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="7.901"/>
<vertex x="-2.9988" y="6.7675"/>
<vertex x="-1.6494" y="6.7675"/>
<vertex x="-1.6494" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="6.5675"/>
<vertex x="-2.9988" y="5.434"/>
<vertex x="-1.6494" y="5.434"/>
<vertex x="-1.6494" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="5.234"/>
<vertex x="-2.9988" y="4.1005"/>
<vertex x="-1.6494" y="4.1005"/>
<vertex x="-1.6494" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="3.9005"/>
<vertex x="-2.9988" y="2.767"/>
<vertex x="-1.6494" y="2.767"/>
<vertex x="-1.6494" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="2.567"/>
<vertex x="-2.9988" y="1.4335"/>
<vertex x="-1.6494" y="1.4335"/>
<vertex x="-1.6494" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="1.2335"/>
<vertex x="-2.9988" y="0.1"/>
<vertex x="-1.6494" y="0.1"/>
<vertex x="-1.6494" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-0.1"/>
<vertex x="-2.9988" y="-1.2335"/>
<vertex x="-1.6494" y="-1.2335"/>
<vertex x="-1.6494" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-1.4335"/>
<vertex x="-2.9988" y="-2.567"/>
<vertex x="-1.6494" y="-2.567"/>
<vertex x="-1.6494" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-2.767"/>
<vertex x="-2.9988" y="-3.9005"/>
<vertex x="-1.6494" y="-3.9005"/>
<vertex x="-1.6494" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-4.1005"/>
<vertex x="-2.9988" y="-5.234"/>
<vertex x="-1.6494" y="-5.234"/>
<vertex x="-1.6494" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-5.434"/>
<vertex x="-2.9988" y="-6.5675"/>
<vertex x="-1.6494" y="-6.5675"/>
<vertex x="-1.6494" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-2.9988" y="-6.7675"/>
<vertex x="-2.9988" y="-7.901"/>
<vertex x="-1.6494" y="-7.901"/>
<vertex x="-1.6494" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="7.901"/>
<vertex x="-1.4494" y="6.7675"/>
<vertex x="-0.1" y="6.7675"/>
<vertex x="-0.1" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="6.5675"/>
<vertex x="-1.4494" y="5.434"/>
<vertex x="-0.1" y="5.434"/>
<vertex x="-0.1" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="5.234"/>
<vertex x="-1.4494" y="4.1005"/>
<vertex x="-0.1" y="4.1005"/>
<vertex x="-0.1" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="3.9005"/>
<vertex x="-1.4494" y="2.767"/>
<vertex x="-0.1" y="2.767"/>
<vertex x="-0.1" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="2.567"/>
<vertex x="-1.4494" y="1.4335"/>
<vertex x="-0.1" y="1.4335"/>
<vertex x="-0.1" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="1.2335"/>
<vertex x="-1.4494" y="0.1"/>
<vertex x="-0.1" y="0.1"/>
<vertex x="-0.1" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-0.1"/>
<vertex x="-1.4494" y="-1.2335"/>
<vertex x="-0.1" y="-1.2335"/>
<vertex x="-0.1" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-1.4335"/>
<vertex x="-1.4494" y="-2.567"/>
<vertex x="-0.1" y="-2.567"/>
<vertex x="-0.1" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-2.767"/>
<vertex x="-1.4494" y="-3.9005"/>
<vertex x="-0.1" y="-3.9005"/>
<vertex x="-0.1" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-4.1005"/>
<vertex x="-1.4494" y="-5.234"/>
<vertex x="-0.1" y="-5.234"/>
<vertex x="-0.1" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-5.434"/>
<vertex x="-1.4494" y="-6.5675"/>
<vertex x="-0.1" y="-6.5675"/>
<vertex x="-0.1" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="-1.4494" y="-6.7675"/>
<vertex x="-1.4494" y="-7.901"/>
<vertex x="-0.1" y="-7.901"/>
<vertex x="-0.1" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="7.901"/>
<vertex x="0.1" y="6.7675"/>
<vertex x="1.4494" y="6.7675"/>
<vertex x="1.4494" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="6.5675"/>
<vertex x="0.1" y="5.434"/>
<vertex x="1.4494" y="5.434"/>
<vertex x="1.4494" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="5.234"/>
<vertex x="0.1" y="4.1005"/>
<vertex x="1.4494" y="4.1005"/>
<vertex x="1.4494" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="3.9005"/>
<vertex x="0.1" y="2.767"/>
<vertex x="1.4494" y="2.767"/>
<vertex x="1.4494" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="2.567"/>
<vertex x="0.1" y="1.4335"/>
<vertex x="1.4494" y="1.4335"/>
<vertex x="1.4494" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="1.2335"/>
<vertex x="0.1" y="0.1"/>
<vertex x="1.4494" y="0.1"/>
<vertex x="1.4494" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-0.1"/>
<vertex x="0.1" y="-1.2335"/>
<vertex x="1.4494" y="-1.2335"/>
<vertex x="1.4494" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-1.4335"/>
<vertex x="0.1" y="-2.567"/>
<vertex x="1.4494" y="-2.567"/>
<vertex x="1.4494" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-2.767"/>
<vertex x="0.1" y="-3.9005"/>
<vertex x="1.4494" y="-3.9005"/>
<vertex x="1.4494" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-4.1005"/>
<vertex x="0.1" y="-5.234"/>
<vertex x="1.4494" y="-5.234"/>
<vertex x="1.4494" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-5.434"/>
<vertex x="0.1" y="-6.5675"/>
<vertex x="1.4494" y="-6.5675"/>
<vertex x="1.4494" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="0.1" y="-6.7675"/>
<vertex x="0.1" y="-7.901"/>
<vertex x="1.4494" y="-7.901"/>
<vertex x="1.4494" y="-6.7675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="7.901"/>
<vertex x="1.6494" y="6.7675"/>
<vertex x="2.9988" y="6.7675"/>
<vertex x="2.9988" y="7.901"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="6.5675"/>
<vertex x="1.6494" y="5.434"/>
<vertex x="2.9988" y="5.434"/>
<vertex x="2.9988" y="6.5675"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="5.234"/>
<vertex x="1.6494" y="4.1005"/>
<vertex x="2.9988" y="4.1005"/>
<vertex x="2.9988" y="5.234"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="3.9005"/>
<vertex x="1.6494" y="2.767"/>
<vertex x="2.9988" y="2.767"/>
<vertex x="2.9988" y="3.9005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="2.567"/>
<vertex x="1.6494" y="1.4335"/>
<vertex x="2.9988" y="1.4335"/>
<vertex x="2.9988" y="2.567"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="1.2335"/>
<vertex x="1.6494" y="0.1"/>
<vertex x="2.9988" y="0.1"/>
<vertex x="2.9988" y="1.2335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-0.1"/>
<vertex x="1.6494" y="-1.2335"/>
<vertex x="2.9988" y="-1.2335"/>
<vertex x="2.9988" y="-0.1"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-1.4335"/>
<vertex x="1.6494" y="-2.567"/>
<vertex x="2.9988" y="-2.567"/>
<vertex x="2.9988" y="-1.4335"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-2.767"/>
<vertex x="1.6494" y="-3.9005"/>
<vertex x="2.9988" y="-3.9005"/>
<vertex x="2.9988" y="-2.767"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-4.1005"/>
<vertex x="1.6494" y="-5.234"/>
<vertex x="2.9988" y="-5.234"/>
<vertex x="2.9988" y="-4.1005"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-5.434"/>
<vertex x="1.6494" y="-6.5675"/>
<vertex x="2.9988" y="-6.5675"/>
<vertex x="2.9988" y="-5.434"/>
</polygon>
<polygon width="0.0254" layer="31">
<vertex x="1.6494" y="-6.7675"/>
<vertex x="1.6494" y="-7.901"/>
<vertex x="2.9988" y="-7.901"/>
<vertex x="2.9988" y="-6.7675"/>
</polygon>
<polygon width="0.1524" layer="41">
<vertex x="-7.8867" y="-8.4836"/>
<vertex x="-7.8867" y="8.4836"/>
<vertex x="7.8867" y="8.4836"/>
<vertex x="7.8867" y="-8.4836"/>
</polygon>
<wire x1="-5.5372" y1="0" x2="-5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.5372" y2="10.287" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="0" x2="5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.5372" y2="10.287" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="5.5372" y2="9.906" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.2832" y2="10.033" width="0.1524" layer="47"/>
<wire x1="-5.5372" y1="9.906" x2="-5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="-5.2832" y1="10.033" x2="-5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.2832" y2="10.033" width="0.1524" layer="47"/>
<wire x1="5.5372" y1="9.906" x2="5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="5.2832" y1="10.033" x2="5.2832" y2="9.779" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-10.287" x2="-7.2644" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.2644" y2="12.192" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="0" x2="7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.2644" y2="12.192" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="7.2644" y2="11.811" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.0104" y2="11.938" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="11.811" x2="-7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="-7.0104" y1="11.938" x2="-7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.0104" y2="11.938" width="0.1524" layer="47"/>
<wire x1="7.2644" y1="11.811" x2="7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="7.0104" y1="11.938" x2="7.0104" y2="11.684" width="0.1524" layer="47"/>
<wire x1="0" y1="8.001" x2="8.0772" y2="8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.4836" y2="8.001" width="0.1524" layer="47"/>
<wire x1="0" y1="-8.001" x2="8.0772" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="8.4836" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.0772" y2="-8.001" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="7.9756" y2="7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="8.001" x2="8.2296" y2="7.747" width="0.1524" layer="47"/>
<wire x1="7.9756" y1="7.747" x2="8.2296" y2="7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="7.9756" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="8.0772" y1="-8.001" x2="8.2296" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="7.9756" y1="-7.747" x2="8.2296" y2="-7.747" width="0.1524" layer="47"/>
<wire x1="-6.6548" y1="5.715" x2="-9.1948" y2="5.715" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="5.715" x2="-9.5758" y2="5.715" width="0.1524" layer="47"/>
<wire x1="-6.6548" y1="4.445" x2="-9.1948" y2="4.445" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="4.445" x2="-9.5758" y2="4.445" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="5.715" x2="-9.1948" y2="6.985" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="4.445" x2="-9.1948" y2="3.175" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="5.715" x2="-9.3218" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="5.715" x2="-9.0678" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.3218" y1="5.969" x2="-9.0678" y2="5.969" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="4.445" x2="-9.3218" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-9.1948" y1="4.445" x2="-9.0678" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-9.3218" y1="4.191" x2="-9.0678" y2="4.191" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="0" x2="-6.1468" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-6.1468" y2="-10.287" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-8.5344" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-4.8768" y2="-9.906" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.5184" y2="-9.779" width="0.1524" layer="47"/>
<wire x1="-7.2644" y1="-9.906" x2="-7.5184" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-7.5184" y1="-9.779" x2="-7.5184" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-5.8928" y2="-9.779" width="0.1524" layer="47"/>
<wire x1="-6.1468" y1="-9.906" x2="-5.8928" y2="-10.033" width="0.1524" layer="47"/>
<wire x1="-5.8928" y1="-9.779" x2="-5.8928" y2="-10.033" width="0.1524" layer="47"/>
<text x="-15.2146" y="-13.081" size="1.27" layer="47" ratio="6" rot="SR0">Default Padstyle: RX59Y21D0T</text>
<text x="-15.5702" y="-14.605" size="1.27" layer="47" ratio="6" rot="SR0">Pin One Padstyle: RX59Y21D0T</text>
<text x="-17.2974" y="-16.129" size="1.27" layer="47" ratio="6" rot="SR0">Heat Tab Padstyle: RX244Y630D0T</text>
<text x="-14.8082" y="-19.177" size="1.27" layer="47" ratio="6" rot="SR0">Alt 1 Padstyle: OX60Y90D30P</text>
<text x="-14.8082" y="-20.701" size="1.27" layer="47" ratio="6" rot="SR0">Alt 2 Padstyle: OX90Y60D30P</text>
<text x="-3.7592" y="10.414" size="0.635" layer="47" ratio="4" rot="SR0">0.437in/11.1mm</text>
<text x="-4.318" y="12.319" size="0.635" layer="47" ratio="4" rot="SR0">0.571in/14.503mm</text>
<text x="8.5852" y="-0.3048" size="0.635" layer="47" ratio="4" rot="SR0">0.63in/16.002mm</text>
<text x="-16.637" y="4.7752" size="0.635" layer="47" ratio="4" rot="SR0">0.05in/1.27mm</text>
<text x="-10.7442" y="-11.049" size="0.635" layer="47" ratio="4" rot="SR0">0.043in/1.092mm</text>
<text x="-3.2766" y="-0.635" size="1.27" layer="27" ratio="6" rot="SR0">&gt;Name</text>
</package>
</packages>
<symbols>
<symbol name="L298P">
<pin name="GND_2" x="2.54" y="0" length="middle" direction="pas"/>
<pin name="SENSEA" x="2.54" y="-2.54" length="middle" direction="in"/>
<pin name="NC_2" x="2.54" y="-5.08" length="middle" direction="nc"/>
<pin name="OUT1" x="2.54" y="-7.62" length="middle" direction="out"/>
<pin name="OUT2" x="2.54" y="-10.16" length="middle" direction="out"/>
<pin name="VS" x="2.54" y="-12.7" length="middle" direction="pwr"/>
<pin name="INPUT1" x="2.54" y="-15.24" length="middle" direction="in"/>
<pin name="ENABLEA" x="2.54" y="-17.78" length="middle" direction="in"/>
<pin name="INPUT2" x="2.54" y="-20.32" length="middle" direction="in"/>
<pin name="GND_3" x="2.54" y="-22.86" length="middle" direction="pas"/>
<pin name="GND_4" x="48.26" y="-22.86" length="middle" direction="pas" rot="R180"/>
<pin name="VSS" x="48.26" y="-20.32" length="middle" direction="pwr" rot="R180"/>
<pin name="INPUT3" x="48.26" y="-17.78" length="middle" direction="in" rot="R180"/>
<pin name="ENABLEB" x="48.26" y="-15.24" length="middle" direction="in" rot="R180"/>
<pin name="INPUT4" x="48.26" y="-12.7" length="middle" direction="in" rot="R180"/>
<pin name="OUT3" x="48.26" y="-10.16" length="middle" direction="out" rot="R180"/>
<pin name="OUT4" x="48.26" y="-7.62" length="middle" direction="out" rot="R180"/>
<pin name="NC" x="48.26" y="-5.08" length="middle" direction="nc" rot="R180"/>
<pin name="SENSEB" x="48.26" y="-2.54" length="middle" direction="in" rot="R180"/>
<pin name="GND" x="48.26" y="0" length="middle" direction="pas" rot="R180"/>
<wire x1="7.62" y1="5.08" x2="7.62" y2="-27.94" width="0.1524" layer="94"/>
<wire x1="7.62" y1="-27.94" x2="43.18" y2="-27.94" width="0.1524" layer="94"/>
<wire x1="43.18" y1="-27.94" x2="43.18" y2="5.08" width="0.1524" layer="94"/>
<wire x1="43.18" y1="5.08" x2="7.62" y2="5.08" width="0.1524" layer="94"/>
<text x="20.6756" y="9.1186" size="2.0828" layer="95" ratio="6" rot="SR0">&gt;Name</text>
<text x="20.0406" y="6.5786" size="2.0828" layer="96" ratio="6" rot="SR0">&gt;Value</text>
</symbol>
</symbols>
<devicesets>
<deviceset name="L298P" prefix="CR">
<gates>
<gate name="A" symbol="L298P" x="0" y="0"/>
</gates>
<devices>
<device name="" package="POWERSO-20_STM">
<connects>
<connect gate="A" pin="ENABLEA" pad="8"/>
<connect gate="A" pin="ENABLEB" pad="14"/>
<connect gate="A" pin="GND" pad="20"/>
<connect gate="A" pin="GND_2" pad="1"/>
<connect gate="A" pin="GND_3" pad="10"/>
<connect gate="A" pin="GND_4" pad="11"/>
<connect gate="A" pin="INPUT1" pad="7"/>
<connect gate="A" pin="INPUT2" pad="9"/>
<connect gate="A" pin="INPUT3" pad="13"/>
<connect gate="A" pin="INPUT4" pad="15"/>
<connect gate="A" pin="NC" pad="18"/>
<connect gate="A" pin="NC_2" pad="3"/>
<connect gate="A" pin="OUT1" pad="4"/>
<connect gate="A" pin="OUT2" pad="5"/>
<connect gate="A" pin="OUT3" pad="16"/>
<connect gate="A" pin="OUT4" pad="17"/>
<connect gate="A" pin="SENSEA" pad="2"/>
<connect gate="A" pin="SENSEB" pad="19"/>
<connect gate="A" pin="VS" pad="6"/>
<connect gate="A" pin="VSS" pad="12"/>
</connects>
<technologies>
<technology name="">
<attribute name="COPYRIGHT" value="Copyright (C) 2022 Ultra Librarian. All rights reserved." constant="no"/>
<attribute name="MANUFACTURER_PART_NUMBER" value="L298P" constant="no"/>
<attribute name="MFR_NAME" value="STMicroelectronics" constant="no"/>
</technology>
</technologies>
</device>
<device name="POWERSO-20_STM-M" package="POWERSO-20_STM-M">
<connects>
<connect gate="A" pin="ENABLEA" pad="8"/>
<connect gate="A" pin="ENABLEB" pad="14"/>
<connect gate="A" pin="GND" pad="20"/>
<connect gate="A" pin="GND_2" pad="1"/>
<connect gate="A" pin="GND_3" pad="10"/>
<connect gate="A" pin="GND_4" pad="11"/>
<connect gate="A" pin="INPUT1" pad="7"/>
<connect gate="A" pin="INPUT2" pad="9"/>
<connect gate="A" pin="INPUT3" pad="13"/>
<connect gate="A" pin="INPUT4" pad="15"/>
<connect gate="A" pin="NC" pad="18"/>
<connect gate="A" pin="NC_2" pad="3"/>
<connect gate="A" pin="OUT1" pad="4"/>
<connect gate="A" pin="OUT2" pad="5"/>
<connect gate="A" pin="OUT3" pad="16"/>
<connect gate="A" pin="OUT4" pad="17"/>
<connect gate="A" pin="SENSEA" pad="2"/>
<connect gate="A" pin="SENSEB" pad="19"/>
<connect gate="A" pin="VS" pad="6"/>
<connect gate="A" pin="VSS" pad="12"/>
</connects>
<technologies>
<technology name="">
<attribute name="COPYRIGHT" value="Copyright (C) 2022 Ultra Librarian. All rights reserved." constant="no"/>
<attribute name="MANUFACTURER_PART_NUMBER" value="L298P" constant="no"/>
<attribute name="MFR_NAME" value="STMicroelectronics" constant="no"/>
</technology>
</technologies>
</device>
<device name="POWERSO-20_STM-L" package="POWERSO-20_STM-L">
<connects>
<connect gate="A" pin="ENABLEA" pad="8"/>
<connect gate="A" pin="ENABLEB" pad="14"/>
<connect gate="A" pin="GND" pad="20"/>
<connect gate="A" pin="GND_2" pad="1"/>
<connect gate="A" pin="GND_3" pad="10"/>
<connect gate="A" pin="GND_4" pad="11"/>
<connect gate="A" pin="INPUT1" pad="7"/>
<connect gate="A" pin="INPUT2" pad="9"/>
<connect gate="A" pin="INPUT3" pad="13"/>
<connect gate="A" pin="INPUT4" pad="15"/>
<connect gate="A" pin="NC" pad="18"/>
<connect gate="A" pin="NC_2" pad="3"/>
<connect gate="A" pin="OUT1" pad="4"/>
<connect gate="A" pin="OUT2" pad="5"/>
<connect gate="A" pin="OUT3" pad="16"/>
<connect gate="A" pin="OUT4" pad="17"/>
<connect gate="A" pin="SENSEA" pad="2"/>
<connect gate="A" pin="SENSEB" pad="19"/>
<connect gate="A" pin="VS" pad="6"/>
<connect gate="A" pin="VSS" pad="12"/>
</connects>
<technologies>
<technology name="">
<attribute name="COPYRIGHT" value="Copyright (C) 2022 Ultra Librarian. All rights reserved." constant="no"/>
<attribute name="MANUFACTURER_PART_NUMBER" value="L298P" constant="no"/>
<attribute name="MFR_NAME" value="STMicroelectronics" constant="no"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
<library name="con-harting-ml" urn="urn:adsk.eagle:library:149">
<description>&lt;b&gt;Harting  &amp; 3M Connectors&lt;/b&gt;&lt;p&gt;
Low profile connectors, straight&lt;p&gt;
&lt;author&gt;Created by librarian@cadsoft.de&lt;/author&gt;</description>
<packages>
<package name="ML6" urn="urn:adsk.eagle:footprint:6943/1" library_version="2">
<description>&lt;b&gt;HARTING&lt;/b&gt;</description>
<wire x1="-6.35" y1="3.175" x2="6.35" y2="3.175" width="0.1524" layer="21"/>
<wire x1="6.35" y1="-3.175" x2="6.35" y2="3.175" width="0.1524" layer="21"/>
<wire x1="-6.35" y1="3.175" x2="-6.35" y2="-3.175" width="0.1524" layer="21"/>
<wire x1="-7.62" y1="4.445" x2="-6.35" y2="4.445" width="0.1524" layer="21"/>
<wire x1="7.62" y1="-4.445" x2="7.62" y2="4.445" width="0.1524" layer="21"/>
<wire x1="-7.62" y1="4.445" x2="-7.62" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="2.032" y1="-2.413" x2="2.032" y2="-3.175" width="0.1524" layer="21"/>
<wire x1="2.032" y1="-2.413" x2="-2.032" y2="-2.413" width="0.1524" layer="21"/>
<wire x1="-2.032" y1="-3.175" x2="-2.032" y2="-2.413" width="0.1524" layer="21"/>
<wire x1="-2.032" y1="-3.175" x2="-6.35" y2="-3.175" width="0.1524" layer="21"/>
<wire x1="-2.032" y1="-3.175" x2="-2.032" y2="-3.429" width="0.1524" layer="21"/>
<wire x1="6.35" y1="4.445" x2="6.35" y2="4.699" width="0.1524" layer="21"/>
<wire x1="6.35" y1="4.699" x2="5.08" y2="4.699" width="0.1524" layer="21"/>
<wire x1="5.08" y1="4.445" x2="5.08" y2="4.699" width="0.1524" layer="21"/>
<wire x1="6.35" y1="4.445" x2="7.62" y2="4.445" width="0.1524" layer="21"/>
<wire x1="0.635" y1="4.699" x2="-0.635" y2="4.699" width="0.1524" layer="21"/>
<wire x1="0.635" y1="4.699" x2="0.635" y2="4.445" width="0.1524" layer="21"/>
<wire x1="0.635" y1="4.445" x2="5.08" y2="4.445" width="0.1524" layer="21"/>
<wire x1="-0.635" y1="4.699" x2="-0.635" y2="4.445" width="0.1524" layer="21"/>
<wire x1="-5.08" y1="4.699" x2="-6.35" y2="4.699" width="0.1524" layer="21"/>
<wire x1="-6.35" y1="4.699" x2="-6.35" y2="4.445" width="0.1524" layer="21"/>
<wire x1="-5.08" y1="4.699" x2="-5.08" y2="4.445" width="0.1524" layer="21"/>
<wire x1="-5.08" y1="4.445" x2="-0.635" y2="4.445" width="0.1524" layer="21"/>
<wire x1="7.62" y1="-4.445" x2="2.032" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="2.032" y1="-4.445" x2="-2.032" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="6.35" y1="-3.175" x2="2.032" y2="-3.175" width="0.1524" layer="21"/>
<wire x1="2.032" y1="-3.175" x2="2.032" y2="-3.429" width="0.1524" layer="21"/>
<wire x1="2.032" y1="-3.429" x2="2.032" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="2.032" y1="-3.429" x2="6.604" y2="-3.429" width="0.0508" layer="21"/>
<wire x1="6.604" y1="-3.429" x2="6.604" y2="3.429" width="0.0508" layer="21"/>
<wire x1="6.604" y1="3.429" x2="-6.604" y2="3.429" width="0.0508" layer="21"/>
<wire x1="-6.604" y1="3.429" x2="-6.604" y2="-3.429" width="0.0508" layer="21"/>
<wire x1="-6.604" y1="-3.429" x2="-2.032" y2="-3.429" width="0.0508" layer="21"/>
<wire x1="-2.032" y1="-3.429" x2="-2.032" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="-2.032" y1="-4.445" x2="-2.54" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="-2.54" y1="-4.318" x2="-2.54" y2="-4.445" width="0.1524" layer="21"/>
<wire x1="-2.54" y1="-4.318" x2="-3.81" y2="-4.318" width="0.1524" layer="21"/>
<wire x1="-3.81" y1="-4.445" x2="-3.81" y2="-4.318" width="0.1524" layer="21"/>
<wire x1="-3.81" y1="-4.445" x2="-7.62" y2="-4.445" width="0.1524" layer="21"/>
<pad name="1" x="-2.54" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="2" x="-2.54" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="3" x="0" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="4" x="0" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="5" x="2.54" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="6" x="2.54" y="1.27" drill="0.9144" shape="octagon"/>
<text x="-7.62" y="5.08" size="1.778" layer="25" ratio="10">&gt;NAME</text>
<text x="0.635" y="5.08" size="1.778" layer="27" ratio="10">&gt;VALUE</text>
<text x="-5.08" y="-1.905" size="1.27" layer="21" ratio="10">1</text>
<text x="-5.08" y="0.635" size="1.27" layer="21" ratio="10">2</text>
<text x="-0.381" y="-4.064" size="1.27" layer="21" ratio="10">6</text>
<rectangle x1="-0.254" y1="1.016" x2="0.254" y2="1.524" layer="51"/>
<rectangle x1="-2.794" y1="1.016" x2="-2.286" y2="1.524" layer="51"/>
<rectangle x1="2.286" y1="1.016" x2="2.794" y2="1.524" layer="51"/>
<rectangle x1="-0.254" y1="-1.524" x2="0.254" y2="-1.016" layer="51"/>
<rectangle x1="-2.794" y1="-1.524" x2="-2.286" y2="-1.016" layer="51"/>
<rectangle x1="2.286" y1="-1.524" x2="2.794" y2="-1.016" layer="51"/>
</package>
<package name="ML6L" urn="urn:adsk.eagle:footprint:6944/1" library_version="2">
<description>&lt;b&gt;HARTING&lt;/b&gt;</description>
<wire x1="-5.08" y1="10.287" x2="-2.54" y2="10.287" width="0.254" layer="21"/>
<wire x1="-2.54" y1="10.287" x2="-3.81" y2="7.747" width="0.254" layer="21"/>
<wire x1="-3.81" y1="7.747" x2="-5.08" y2="10.287" width="0.254" layer="21"/>
<wire x1="-2.159" y1="10.922" x2="-2.159" y2="4.445" width="0.1524" layer="21"/>
<wire x1="-2.159" y1="10.922" x2="2.159" y2="10.922" width="0.1524" layer="21"/>
<wire x1="2.159" y1="10.922" x2="2.159" y2="4.445" width="0.1524" layer="21"/>
<wire x1="2.159" y1="10.922" x2="7.62" y2="10.922" width="0.1524" layer="21"/>
<wire x1="2.159" y1="4.445" x2="-2.159" y2="4.445" width="0.1524" layer="21"/>
<wire x1="2.159" y1="3.429" x2="-2.159" y2="3.429" width="0.1524" layer="21"/>
<wire x1="-2.159" y1="4.445" x2="-2.159" y2="3.429" width="0.1524" layer="21"/>
<wire x1="2.159" y1="4.445" x2="2.159" y2="3.429" width="0.1524" layer="21"/>
<wire x1="-3.175" y1="2.032" x2="-1.905" y2="2.032" width="0.1524" layer="51"/>
<wire x1="-1.905" y1="2.032" x2="-0.635" y2="2.032" width="0.1524" layer="21"/>
<wire x1="-0.635" y1="2.032" x2="0.635" y2="2.032" width="0.1524" layer="51"/>
<wire x1="0.635" y1="2.032" x2="1.905" y2="2.032" width="0.1524" layer="21"/>
<wire x1="1.905" y1="2.032" x2="3.175" y2="2.032" width="0.1524" layer="51"/>
<wire x1="0" y1="10.16" x2="0" y2="10.414" width="0.508" layer="21"/>
<wire x1="3.302" y1="10.287" x2="3.302" y2="7.493" width="0.1524" layer="21"/>
<wire x1="3.302" y1="7.493" x2="7.112" y2="7.493" width="0.1524" layer="21"/>
<wire x1="7.112" y1="10.287" x2="7.112" y2="7.493" width="0.1524" layer="21"/>
<wire x1="7.112" y1="10.287" x2="3.302" y2="10.287" width="0.1524" layer="21"/>
<wire x1="7.62" y1="10.922" x2="7.62" y2="2.032" width="0.1524" layer="21"/>
<wire x1="7.62" y1="2.032" x2="6.477" y2="2.032" width="0.1524" layer="21"/>
<wire x1="-2.159" y1="10.922" x2="-7.62" y2="10.922" width="0.1524" layer="21"/>
<wire x1="-7.62" y1="10.922" x2="-7.62" y2="2.032" width="0.1524" layer="21"/>
<wire x1="-7.62" y1="2.032" x2="-6.477" y2="2.032" width="0.1524" layer="21"/>
<wire x1="5.461" y1="2.032" x2="5.461" y2="1.397" width="0.1524" layer="21"/>
<wire x1="5.461" y1="2.032" x2="3.175" y2="2.032" width="0.1524" layer="21"/>
<wire x1="5.461" y1="1.397" x2="6.477" y2="1.397" width="0.1524" layer="21"/>
<wire x1="6.477" y1="2.032" x2="6.477" y2="1.397" width="0.1524" layer="21"/>
<wire x1="6.477" y1="2.032" x2="5.461" y2="2.032" width="0.1524" layer="21"/>
<wire x1="-5.461" y1="2.032" x2="-5.461" y2="1.397" width="0.1524" layer="21"/>
<wire x1="-5.461" y1="2.032" x2="-3.175" y2="2.032" width="0.1524" layer="21"/>
<wire x1="-5.461" y1="1.397" x2="-6.477" y2="1.397" width="0.1524" layer="21"/>
<wire x1="-6.477" y1="2.032" x2="-6.477" y2="1.397" width="0.1524" layer="21"/>
<wire x1="-6.477" y1="2.032" x2="-5.461" y2="2.032" width="0.1524" layer="21"/>
<pad name="1" x="-2.54" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="2" x="-2.54" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="3" x="0" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="4" x="0" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="5" x="2.54" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="6" x="2.54" y="1.27" drill="0.9144" shape="octagon"/>
<text x="-4.6228" y="-1.6764" size="1.27" layer="21" ratio="10">1</text>
<text x="-4.6482" y="0.3556" size="1.27" layer="21" ratio="10">2</text>
<text x="-7.6454" y="11.43" size="1.778" layer="25" ratio="10">&gt;NAME</text>
<text x="0.6096" y="11.43" size="1.778" layer="27" ratio="10">&gt;VALUE</text>
<text x="4.572" y="8.128" size="1.524" layer="21" ratio="10">6</text>
<rectangle x1="-0.254" y1="4.445" x2="0.254" y2="10.287" layer="21"/>
<rectangle x1="-4.953" y1="9.779" x2="-2.667" y2="10.287" layer="21"/>
<rectangle x1="-4.699" y1="9.271" x2="-2.921" y2="9.779" layer="21"/>
<rectangle x1="-4.445" y1="8.763" x2="-3.175" y2="9.271" layer="21"/>
<rectangle x1="-4.191" y1="8.255" x2="-3.429" y2="8.763" layer="21"/>
<rectangle x1="-3.937" y1="8.001" x2="-3.683" y2="8.255" layer="21"/>
<rectangle x1="-2.794" y1="0.381" x2="-2.286" y2="2.032" layer="51"/>
<rectangle x1="-2.794" y1="-0.381" x2="-2.286" y2="0.381" layer="21"/>
<rectangle x1="-2.794" y1="-1.524" x2="-2.286" y2="-0.381" layer="51"/>
<rectangle x1="-0.254" y1="0.381" x2="0.254" y2="2.032" layer="51"/>
<rectangle x1="-0.254" y1="-0.381" x2="0.254" y2="0.381" layer="21"/>
<rectangle x1="-0.254" y1="-1.524" x2="0.254" y2="-0.381" layer="51"/>
<rectangle x1="2.286" y1="0.381" x2="2.794" y2="2.032" layer="51"/>
<rectangle x1="2.286" y1="-0.381" x2="2.794" y2="0.381" layer="21"/>
<rectangle x1="2.286" y1="-1.524" x2="2.794" y2="-0.381" layer="51"/>
</package>
</packages>
<packages3d>
<package3d name="ML6" urn="urn:adsk.eagle:package:6988/1" type="box" library_version="2">
<description>HARTING</description>
<packageinstances>
<packageinstance name="ML6"/>
</packageinstances>
</package3d>
<package3d name="ML6L" urn="urn:adsk.eagle:package:6987/1" type="box" library_version="2">
<description>HARTING</description>
<packageinstances>
<packageinstance name="ML6L"/>
</packageinstances>
</package3d>
</packages3d>
<symbols>
<symbol name="06P" urn="urn:adsk.eagle:symbol:6942/1" library_version="2">
<wire x1="3.81" y1="-5.08" x2="-3.81" y2="-5.08" width="0.4064" layer="94"/>
<wire x1="-3.81" y1="5.08" x2="-3.81" y2="-5.08" width="0.4064" layer="94"/>
<wire x1="3.81" y1="-5.08" x2="3.81" y2="5.08" width="0.4064" layer="94"/>
<wire x1="-3.81" y1="5.08" x2="3.81" y2="5.08" width="0.4064" layer="94"/>
<wire x1="1.27" y1="2.54" x2="2.54" y2="2.54" width="0.6096" layer="94"/>
<wire x1="1.27" y1="0" x2="2.54" y2="0" width="0.6096" layer="94"/>
<wire x1="1.27" y1="-2.54" x2="2.54" y2="-2.54" width="0.6096" layer="94"/>
<wire x1="-2.54" y1="2.54" x2="-1.27" y2="2.54" width="0.6096" layer="94"/>
<wire x1="-2.54" y1="0" x2="-1.27" y2="0" width="0.6096" layer="94"/>
<wire x1="-2.54" y1="-2.54" x2="-1.27" y2="-2.54" width="0.6096" layer="94"/>
<text x="-3.81" y="-7.62" size="1.778" layer="96">&gt;VALUE</text>
<text x="-3.81" y="5.842" size="1.778" layer="95">&gt;NAME</text>
<pin name="1" x="7.62" y="-2.54" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="2" x="-7.62" y="-2.54" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="3" x="7.62" y="0" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="4" x="-7.62" y="0" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="5" x="7.62" y="2.54" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="6" x="-7.62" y="2.54" visible="pad" length="middle" direction="pas" swaplevel="1"/>
</symbol>
</symbols>
<devicesets>
<deviceset name="ML6" urn="urn:adsk.eagle:component:7012/2" prefix="SV" uservalue="yes" library_version="2">
<description>&lt;b&gt;HARTING&lt;/b&gt;</description>
<gates>
<gate name="1" symbol="06P" x="0" y="0"/>
</gates>
<devices>
<device name="" package="ML6">
<connects>
<connect gate="1" pin="1" pad="1"/>
<connect gate="1" pin="2" pad="2"/>
<connect gate="1" pin="3" pad="3"/>
<connect gate="1" pin="4" pad="4"/>
<connect gate="1" pin="5" pad="5"/>
<connect gate="1" pin="6" pad="6"/>
</connects>
<package3dinstances>
<package3dinstance package3d_urn="urn:adsk.eagle:package:6988/1"/>
</package3dinstances>
<technologies>
<technology name="">
<attribute name="MF" value="" constant="no"/>
<attribute name="MPN" value="" constant="no"/>
<attribute name="OC_FARNELL" value="unknown" constant="no"/>
<attribute name="OC_NEWARK" value="unknown" constant="no"/>
<attribute name="POPULARITY" value="5" constant="no"/>
</technology>
</technologies>
</device>
<device name="L" package="ML6L">
<connects>
<connect gate="1" pin="1" pad="1"/>
<connect gate="1" pin="2" pad="2"/>
<connect gate="1" pin="3" pad="3"/>
<connect gate="1" pin="4" pad="4"/>
<connect gate="1" pin="5" pad="5"/>
<connect gate="1" pin="6" pad="6"/>
</connects>
<package3dinstances>
<package3dinstance package3d_urn="urn:adsk.eagle:package:6987/1"/>
</package3dinstances>
<technologies>
<technology name="">
<attribute name="MF" value="" constant="no"/>
<attribute name="MPN" value="" constant="no"/>
<attribute name="OC_FARNELL" value="unknown" constant="no"/>
<attribute name="OC_NEWARK" value="unknown" constant="no"/>
<attribute name="POPULARITY" value="0" constant="no"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
</libraries>
<attributes>
</attributes>
<variantdefs>
</variantdefs>
<classes>
<class number="0" name="default" width="0" drill="0">
</class>
</classes>
<parts>
<part name="U1" library="ESP32-S2-WROOM" deviceset="ESP32-S2-WROOM" device=""/>
<part name="CR1" library="shared" deviceset="L298P" device=""/>
<part name="SV1" library="con-harting-ml" library_urn="urn:adsk.eagle:library:149" deviceset="ML6" device="" package3d_urn="urn:adsk.eagle:package:6988/1"/>
<part name="SV2" library="con-harting-ml" library_urn="urn:adsk.eagle:library:149" deviceset="ML6" device="" package3d_urn="urn:adsk.eagle:package:6988/1"/>
</parts>
<sheets>
<sheet>
<plain>
</plain>
<instances>
<instance part="U1" gate="G$1" x="73.66" y="53.34" smashed="yes">
<attribute name="NAME" x="63.7041" y="87.4745" size="1.783840625" layer="95"/>
<attribute name="VALUE" x="63.4533" y="17.6719" size="1.78345" layer="96"/>
</instance>
<instance part="CR1" gate="A" x="45.72" y="-12.7" smashed="yes">
<attribute name="NAME" x="66.3956" y="-3.5814" size="2.0828" layer="95" ratio="6" rot="SR0"/>
<attribute name="VALUE" x="65.7606" y="-6.1214" size="2.0828" layer="96" ratio="6" rot="SR0"/>
</instance>
<instance part="SV1" gate="1" x="127" y="-25.4" smashed="yes">
<attribute name="VALUE" x="123.19" y="-33.02" size="1.778" layer="96"/>
<attribute name="NAME" x="123.19" y="-19.558" size="1.778" layer="95"/>
</instance>
<instance part="SV2" gate="1" x="12.7" y="-22.86" smashed="yes">
<attribute name="VALUE" x="8.89" y="-30.48" size="1.778" layer="96"/>
<attribute name="NAME" x="8.89" y="-17.018" size="1.778" layer="95"/>
</instance>
</instances>
<busses>
</busses>
<nets>
<net name="N$1" class="0">
<segment>
<pinref part="CR1" gate="A" pin="GND_2"/>
<wire x1="48.26" y1="-12.7" x2="45.72" y2="-12.7" width="0.1524" layer="91"/>
<wire x1="45.72" y1="-12.7" x2="45.72" y2="10.16" width="0.1524" layer="91"/>
<wire x1="45.72" y1="10.16" x2="99.06" y2="10.16" width="0.1524" layer="91"/>
<wire x1="99.06" y1="10.16" x2="99.06" y2="22.86" width="0.1524" layer="91"/>
<pinref part="U1" gate="G$1" pin="GND"/>
<wire x1="99.06" y1="22.86" x2="88.9" y2="22.86" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$2" class="0">
<segment>
<pinref part="CR1" gate="A" pin="OUT1"/>
<wire x1="48.26" y1="-20.32" x2="43.18" y2="-20.32" width="0.1524" layer="91"/>
<wire x1="43.18" y1="-20.32" x2="43.18" y2="27.94" width="0.1524" layer="91"/>
<pinref part="U1" gate="G$1" pin="IO15"/>
<wire x1="43.18" y1="27.94" x2="58.42" y2="27.94" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$3" class="0">
<segment>
<pinref part="CR1" gate="A" pin="OUT2"/>
<wire x1="48.26" y1="-22.86" x2="40.64" y2="-22.86" width="0.1524" layer="91"/>
<wire x1="40.64" y1="-22.86" x2="40.64" y2="30.48" width="0.1524" layer="91"/>
<pinref part="U1" gate="G$1" pin="IO14"/>
<wire x1="40.64" y1="30.48" x2="58.42" y2="30.48" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$4" class="0">
<segment>
<pinref part="CR1" gate="A" pin="INPUT1"/>
<wire x1="48.26" y1="-27.94" x2="38.1" y2="-27.94" width="0.1524" layer="91"/>
<wire x1="38.1" y1="-27.94" x2="38.1" y2="33.02" width="0.1524" layer="91"/>
<pinref part="U1" gate="G$1" pin="IO13"/>
<wire x1="38.1" y1="33.02" x2="58.42" y2="33.02" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$5" class="0">
<segment>
<pinref part="CR1" gate="A" pin="INPUT2"/>
<wire x1="48.26" y1="-33.02" x2="35.56" y2="-33.02" width="0.1524" layer="91"/>
<wire x1="35.56" y1="-33.02" x2="35.56" y2="35.56" width="0.1524" layer="91"/>
<pinref part="U1" gate="G$1" pin="IO12"/>
<wire x1="35.56" y1="35.56" x2="58.42" y2="35.56" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$7" class="0">
<segment>
<pinref part="CR1" gate="A" pin="VSS"/>
<wire x1="93.98" y1="-33.02" x2="106.68" y2="-33.02" width="0.1524" layer="91"/>
<wire x1="106.68" y1="-33.02" x2="106.68" y2="-25.4" width="0.1524" layer="91"/>
<pinref part="SV1" gate="1" pin="4"/>
<wire x1="106.68" y1="-25.4" x2="119.38" y2="-25.4" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$6" class="0">
<segment>
<pinref part="SV1" gate="1" pin="3"/>
<wire x1="134.62" y1="-25.4" x2="142.24" y2="-25.4" width="0.1524" layer="91"/>
<wire x1="142.24" y1="-25.4" x2="142.24" y2="-12.7" width="0.1524" layer="91"/>
<pinref part="CR1" gate="A" pin="GND"/>
<wire x1="142.24" y1="-12.7" x2="93.98" y2="-12.7" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$8" class="0">
<segment>
<pinref part="SV1" gate="1" pin="6"/>
<wire x1="119.38" y1="-22.86" x2="93.98" y2="-22.86" width="0.1524" layer="91"/>
<pinref part="CR1" gate="A" pin="OUT3"/>
</segment>
</net>
<net name="N$9" class="0">
<segment>
<pinref part="SV1" gate="1" pin="5"/>
<wire x1="134.62" y1="-22.86" x2="134.62" y2="-15.24" width="0.1524" layer="91"/>
<wire x1="134.62" y1="-15.24" x2="116.84" y2="-15.24" width="0.1524" layer="91"/>
<wire x1="116.84" y1="-15.24" x2="116.84" y2="-20.32" width="0.1524" layer="91"/>
<pinref part="CR1" gate="A" pin="OUT4"/>
<wire x1="116.84" y1="-20.32" x2="93.98" y2="-20.32" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$10" class="0">
<segment>
<pinref part="SV1" gate="1" pin="2"/>
<wire x1="119.38" y1="-27.94" x2="99.06" y2="-27.94" width="0.1524" layer="91"/>
<wire x1="99.06" y1="-27.94" x2="99.06" y2="-25.4" width="0.1524" layer="91"/>
<pinref part="CR1" gate="A" pin="INPUT4"/>
<wire x1="99.06" y1="-25.4" x2="93.98" y2="-25.4" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$11" class="0">
<segment>
<pinref part="SV1" gate="1" pin="1"/>
<wire x1="134.62" y1="-27.94" x2="134.62" y2="-33.02" width="0.1524" layer="91"/>
<wire x1="134.62" y1="-33.02" x2="111.76" y2="-33.02" width="0.1524" layer="91"/>
<wire x1="111.76" y1="-33.02" x2="111.76" y2="-30.48" width="0.1524" layer="91"/>
<pinref part="CR1" gate="A" pin="INPUT3"/>
<wire x1="111.76" y1="-30.48" x2="93.98" y2="-30.48" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$12" class="0">
<segment>
<pinref part="CR1" gate="A" pin="GND_3"/>
<wire x1="48.26" y1="-35.56" x2="30.48" y2="-35.56" width="0.1524" layer="91"/>
<wire x1="30.48" y1="-35.56" x2="30.48" y2="-22.86" width="0.1524" layer="91"/>
<pinref part="SV2" gate="1" pin="3"/>
<wire x1="30.48" y1="-22.86" x2="20.32" y2="-22.86" width="0.1524" layer="91"/>
</segment>
</net>
<net name="N$13" class="0">
<segment>
<pinref part="SV2" gate="1" pin="4"/>
<wire x1="5.08" y1="-22.86" x2="-5.08" y2="-22.86" width="0.1524" layer="91"/>
<wire x1="-5.08" y1="-22.86" x2="-5.08" y2="-12.7" width="0.1524" layer="91"/>
<wire x1="-5.08" y1="-12.7" x2="33.02" y2="-12.7" width="0.1524" layer="91"/>
<wire x1="33.02" y1="-12.7" x2="33.02" y2="-25.4" width="0.1524" layer="91"/>
<pinref part="CR1" gate="A" pin="VS"/>
<wire x1="33.02" y1="-25.4" x2="48.26" y2="-25.4" width="0.1524" layer="91"/>
</segment>
</net>
</nets>
</sheet>
</sheets>
</schematic>
</drawing>
<compatibility>
<note version="8.2" severity="warning">
Since Version 8.2, EAGLE supports online libraries. The ids
of those online libraries will not be understood (or retained)
with this version.
</note>
<note version="8.3" severity="warning">
Since Version 8.3, EAGLE supports URNs for individual library
assets (packages, symbols, and devices). The URNs of those assets
will not be understood (or retained) with this version.
</note>
<note version="8.3" severity="warning">
Since Version 8.3, EAGLE supports the association of 3D packages
with devices in libraries, schematics, and board files. Those 3D
packages will not be understood (or retained) with this version.
</note>
</compatibility>
</eagle>
