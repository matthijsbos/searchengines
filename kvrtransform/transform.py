#!/usr/bin/python
import xml.etree.ElemenTree as ET

tree = ET.parse('country_data.xml')
root = tree.getroot()
